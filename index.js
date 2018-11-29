const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require('body-parser');
const csurf = require("csurf");
const bcrypt = require("./bcrypt");
const db = require("./db");

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

// csurf puts into session a secret
// uses secret to generate token
// can get a token that is unique to our site only
// so if via injection the user is rediected, the token will not match and we will be able distinguish between the sites.



// ------------- MY GET REQUESTS ---------------//









// ------------- MY POST REQUESTS ---------------//


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
    db.checkEmail(req.body.email);
    if(!req.body.email) {
        res.json({showErr: true});
    }
    else {
        db.checkEmail(req.body.email).then(function(results) {
            console.log("reesults in APP POST: ", results);
            return bcrypt

                .compare(req.body.password, results.rows[0].password)
                .then(match => {
                    if (match) {
                        req.session.user_id = results.rows[0].id;
                        res.redirect('/main');
                    }
                }).catch(err =>{
                    res.json({showErr: true});


                });
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
        res.redirect("/main");
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
