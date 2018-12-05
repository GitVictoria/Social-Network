const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require('body-parser');
const csurf = require("csurf");
const bcrypt = require("./bcrypt");
const db = require("./db");
const s3 = require("./s3");
var path = require("path");

//---------- BOILER PLATE TO UPLOAD FILES ----------------//

var multer = require("multer"); // takes image and puts in in uploads
var uidSafe = require("uid-safe");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        // where on my computer this file should be saved
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            // will convert name into 24 character string, makes sure every file has unique name
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152 // max size that user can upload
    }
});


// -------------END OF UPLOADER BOILER BLATE ------//

//--------- COOKIE SESSION -----------//

var cookieSession = require("cookie-session");
app.use(
    cookieSession({
        secret: process.env.SESSION_SECRET || `I'm always angry.`, // require("./passwords").sessionSecrets
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
//---------- END OF COOKIE SESSION  -------//


// ------------- APP.USE ---------------//
// body parser is how I get my req.body
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(compression());

app.use(express.static('./public'));

// ------------ CSURF ---------------------//

app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

// ------------ END OF CSURF ---------------------//



// ------------- MY GET REQUESTS ---------------//

app.get('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect("/");
});

app.get('/user', (req, res) => {
    db.getUser(req.session.user_id).then(results => {
        res.json(results); //repsonse from database
        console.log(results);
        // user_id: req.session.user_id;
        // console.log("this is app.get results: ", results);
        // first: results,
        // last: 'vic',
        // profilePicUrl: '/background.jpg'


    }).catch(err => {
        console.log(err);
    });
    // db.getUser
    // select select first, last, profile picurl etc,
    // once we have that data we send it back to
    //axios as a response

});







// ------------- MY POST REQUESTS ---------------//

app.get('/user/:id/info', (req, res) => {
    console.log("req.params.id, ", req.params.id);
    if (req.params.id == req.session.user_id) {
        res.redirect("/");
        // res.json({ error: "same ID" });
    } else {
        db.getUser(req.params.id)
            .then(results => {
                console.log("results in get user/info: ", results.data);
                res.json(results);
            })
            .catch(err => {
                res.json({ error: err });
            });
    }
});

app.post('/bio', (req, res) => {
    if (req.body !== null) {
        console.log("req.body in bio is: ", req.body.bio);
        db.storeBio(
            req.session.user_id,
            req.body.bio
        ).then(results => {
            res.json(results);

        }).catch(err => {
            console.log(err);
        });
    }
});

app.post('/upload', uploader.single('file'), s3.upload, function(req, res) {
    if (req.file) {
        console.log("req.session.user_id: ", req.session.user_id);
        const url = 'https://s3.amazonaws.com/victoria-catnip-imageboards/' + req.file.filename;
        db.storeImages(
            req.session.user_id, url
            // req.body.title,
            // req.body.description,

            // req.body.username
        )
            .then(results => {
                res.json({
                    results: results.rows,
                    success: true
                });
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        res.json({
            success: false
        });
    }

    // upload image to uploads directory
    // upload image to Amazon
    // insert image into db
    // send response nack tp uploader
    // will bd DB query UPDATE not insert
});


app.post('/registration', (req, res) => {
    bcrypt.hash(req.body.password).then(hash => {
        db.createUsers(req.body.first, req.body.last, hash, req.body.email)
            .then(function(results) {
                console.log("app.post of registration running!");
                req.session.user_id = results.rows[0].id;
                console.log("req.session.user_id: ", req.session.user_id);
                console.log("results.rows[0].id: ", results.rows[0].id);
                res.json(results);
            })
            .catch(err => {
                console.log("error in registration", err);
                res.json({showErr: true});
            });
    });
});



app.post('/login', (req, res) => {
    if(!req.body.email) {
        res.json({showErr: true});
    }
    else {
        db.checkEmail(req.body.email).then(function(results) {
            console.log("reesults in APP POST: ", results);
            if (!results.rows[0]) {
                throw new Error;
            }
            return bcrypt

                .compare(req.body.password, results.rows[0].password)
                .then(match => {
                    if (match) {
                        req.session.user_id = results.rows[0].id;
                        res.redirect('/');
                    }
                });
        }).catch(err =>{
            console.log(err);
            res.json({showErr: true});


        });
    }
});









// ------------ DO NOT CHANGE CODE BELLOW --------------//


if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get('/welcome', (req, res) => {
    if (req.session.user_id) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", function(req, res) {
    if (!req.session.user_id) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
        // this is my direct link to start.js
    }
    // one of the two file sthat serve HTML
    // THIS HAS TO BE THE LAST ONE
});

app.listen(8080, function() {
    console.log("I'm listening.");
});

//
