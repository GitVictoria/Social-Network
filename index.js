const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });
const compression = require("compression");
const bodyParser = require('body-parser');
const csurf = require("csurf");
const bcrypt = require("./bcrypt");
const db = require("./db");
const s3 = require("./s3");
const path = require("path");

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

const cookieSession = require('cookie-session');
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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

app.get('/friendslist', (req, res) => {
    db.friendsAndWannabes(req.session.user_id).then(results => {
        res.json(results.rows);
    }).catch(err => {
        console.log(err);
    });
});

app.get("/friendship/:id", (req, res) => {
    db.checkStatus(req.session.user_id, req.params.id).then(results => {
        res.json(results.rows[0]);
    }).catch(err => {
        console.log(err);
    });
});

app.post("/friendship/:id/send", (req, res) => {
    db.sendRequest(req.session.user_id, req.params.id).then(results => {
        res.json(results.rows[0]);
    });
});

app.post("/friendship/:id/cancel", (req, res) => {
    db.cancelRequest(req.session.userId, req.params.id).then(results => {
        res.json(results.rows[0]);
    });
});

app.post("/friendship/:id/accept", (req, res) => {
    db.acceptRequest(req.session.userId, req.params.id).then(results => {
        res.json(results.rows[0]);
    });
});

app.get('/usersss', (req, res) => {
    db.allUsers(req.session.user_id).then(results => {
        console.log("results in index.js  /usersss: ", results);
        res.json(results.rows);
    });
});


app.get('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect("/");
});

app.get('/user', (req, res) => {
    db.getUser(req.session.user_id).then(results => {
        res.json(results); //repsonse from database
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
    if (req.params.id == req.session.user_id) {
        res.redirect("/");
        // res.json({ error: "same ID" });
    } else {
        db.getUser(req.params.id)
            .then(results => {
                res.json(results);
            })
            .catch(err => {
                res.json({ error: err });
            });
    }
});

app.post('/bio', (req, res) => {
    if (req.body !== null) {
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
                req.session.user_id = results.rows[0].id;
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

server.listen(8080, function() {
    console.log("I'm listening.");
});

// all of the server-side socket code here bellow
// listen for socket connections here - log in or register
// io is server side socket
// 'socket' represents the connection that just happened
// everytime a user connects they get a unique socket id
// we have to pass this id to cookie, so we can access use info via socket

//this object will be maintaining a list of everyone currently online
// every key value pair in the object represents a user
let onlineUsers = {
};

let arrOfMessages = [];





// ------- CLASS EXAMPLE ------------ //
// let cuteAnimals = [
//     {
//         animal : 'quoka',
//         cute: 8
//     },
//     {
//         animal : 'squirrel',
//         cute: 9
//     },
//     {
//         animal : 'Lucky',
//         cute: 10
//     }
//
// ];

// socket.emit('cuteAnimals', cuteAnimals);

// ------- CLASS EXAMPLE ------------ //

// everytime io runs, a new person just connected
io.on('connection', socket => {
    console.log(`user with socket id ${ socket.id } just connected`);





    let userId = socket.request.session.user_id;
    let socketId = socket.id;

    onlineUsers[socketId] = userId;

    let arrOfIds = Object.values(onlineUsers);
    // gives us every value inside of object
    // stores those in array


    db.getUsersByIds(arrOfIds).then(results => {
        socket.emit("onlineUsers", results.rows);
    }).catch(err => {
        console.log(err);
    });

    db.getUser(userId).then(result => {


        if (arrOfIds.filter(id => id == userId).length == 1) {
            socket.broadcast.emit('userJoined', result.rows[0]);
        }
    });

    // GET THE NEW USER TO JOIN THE ARRAY

    socket.emit('messages', arrOfMessages);


    socket.on('chatMessage', msg => {


        console.log("msg from chat.js: ", msg);
        // now I have my message in the server
        db.getUser(userId).then(result => {
            let chatObj = {
                message : msg,
                first : result.rows[0].first,
                last: result.rows[0].last,
                profilepic: result.rows[0].profilepic,
                id : result.rows[0].id + '-' + Date.now() + '-' + Math.floor(Math.random() * 993893747483)
            };
            arrOfMessages.push(chatObj);
            while (arrOfMessages.length > 10) {
                arrOfMessages.shift();
            }
            console.log("result in CHAT MESSAGE SOCKET ON: ", result.rows);
            console.log("arrOfMessages: ", arrOfMessages);

            io.sockets.emit('newMessage', arrOfMessages);
            //singulare


        }).catch(err => {
            console.log(err);
        });


    });


    // once that object if full of info, put it into redux -dispatch, action, reducer and should see message instantly



    socket.on('disconnect', function(arrOfIds) {
        db.getUser(userId).then(result => {
            delete onlineUsers[socketId];
            var newArr = Object.values(onlineUsers);
            console.log(newArr.includes(userId));
            if (newArr.includes(userId) == true) {
                return;
            }
            else {
                console.log("result.rows[0]: ", result.rows[0]);
                io.sockets.emit('userLeft', result.rows[0]);
            }
            // if the id is unique
        }).catch(err => {
            console.log("error in disconnect server response : ", err);
        });

        // figure out if the user has just closed one of the tabs OR actually disconnected
    });

    // pass emit 2 arguments
    // 1. name of message -> must be a string
    // 2. any data we want to send along the message - > could be db.query, API, array, object, string
    // db.getUser(userId).then(results => {
    //     socket.emit('catnip', results);
    // });
});

//server is the big wrapper around the current app(server).
// This server
//also listens to socket io communication

// build array of 10 most recent chat essages
// emit that array to the client
