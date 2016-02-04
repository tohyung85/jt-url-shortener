'use strict';

var express = require('express');
var mongo = require('mongodb').MongoClient;
var routes = require('./app/routes/index.js');

var app = express();
var mongoURL = "mongodb://heroku_12527h59:te48kkcge8h8fs5jejn33k2onk@ds055485.mongolab.com:55485/heroku_12527h59";
var port = process.env.PORT || 3000;

mongo.connect(mongoURL, function(err, db){

	if(err) {
		throw err;
	} else {
		console.log("connecting to Mongo database...");
	}

	routes(app,db);

	app.listen(port, function(){
		console.log("listening to port " + port + "...");
	});

});


