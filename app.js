/*
============================================
; Title: Assignment 4.2
; Author: Professor Krasso
; Date: 20 June 2021
; Modified By: Angela Martin
; Description: This program utilizes Node.js. This is the Composer API.
;===========================================
*/

//Required.
var express = require("express");

var http = require("http");

var swaggerUIExpress = require("swagger-ui-express");

var swaggerJSDoc = require("swagger-jsdoc");

var mongoose = require("mongoose");

var composerRoutes = require('./routes/martin-composer-routes.js')

var personRoutes = require('./routes/martin-person-routes.js')

var userRoutes = require('./routes/martin-session-routes.js')

var customerRoutes = require('./routes/martin-node-shopper-routes.js')

var teamRoutes = require('./routes/martin-team-routes.js')

// Link to mongoDB.
var mongoDBLink = "mongodb+srv://admin:admin@buwebdev-cluster-1.teesf.mongodb.net/test"

// Mongoose connection. 
mongoose.connect(mongoDBLink, {
});

mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error: "));

db.once("open", function() {
    console.log("Application connected to MongoDB instance");
});


// Create app variable.
let app = express();

//Set port.
app.set("port", process.env.PORT || 3000);

// Use express.json.
app.use(express.json());

// Use express.urlencoded
app.use(express.urlencoded('extended', true));

app.use('/api', [composerRoutes, personRoutes, userRoutes, customerRoutes, teamRoutes])

//Define options.
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "WEB 420 RESTful APIs",
            version: "1.0.0",
        },
    },
    apis: ['./routes/*.js'],
}

const openAPISpecification = swaggerJSDoc(options);

app.use('/api-docs', swaggerUIExpress.serve, swaggerUIExpress.setup(openAPISpecification));


// Create server and listen on port 3000.
http.createServer(app).listen(3000, function() {

    console.log("Application started and listening on port 3000!");
 
 });
