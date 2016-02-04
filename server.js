'use strict';

var express = require('express');
var mongo = require('mongodb').MongoClient;

var app = express();
//var mongoURL;
var port = process.env.PORT || 3000;

app.route('/')
	.get(function(req, res){
		res.send('hello world');
	});


app.listen(port, function(){
	console.log("listening to port " + port + "...");
});
