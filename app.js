

var express = require("express");

var http = require("http");

var swaggerUIExpress = require("swagger-ui-express");

var swaggerJSDoc = require("swagger-jsdoc");

var mongoose = require("mongoose");


let app = express();
app.set("port", process.env.PORT || 3000);

app.use(express.json());

app.use(express.urlencoded('extended', true));

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

http.createServer(app).listen(3000, function() {

    console.log("Application started and listening on port 3000!");
 
 });
