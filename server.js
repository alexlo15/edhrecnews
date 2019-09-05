// DEPENDENCIES ---
//for setting up server
var express = require("express");
//noSQl database
var mongoose = require("mongoose");
//will make automatic console.logs
var logger = require("morgan");
// Set Handlebars.
var exphbs = require("express-handlebars");

require('dotenv').config()

//----


//create express server
var app = express();

//automatic console logging
app.use(logger("dev"));

// Parse request body as JSON
//for deployment
app.use(express.urlencoded({ extended: false }));
//for development
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Use static folder
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/edhNews";
//for deployment
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
// for development
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//HANDLEBARS ---
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// ---

//Import routes
var routes = require("./routes");
app.use(routes);


var PORT = process.env.PORT || 3000;
//start server listening on port 3000
app.listen(PORT, function() {
	console.log("App running on port 3000!");
});