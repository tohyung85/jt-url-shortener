'use strict';

var validURI = require('valid-url');

var InputHandler = function(app,db) {

	var collection = db.collection('urlDatabase');

	this.insertNewUrl = function(req, res) {
		var unfilteredStr = req.path;
		var url = unfilteredStr.substring(5);		

		var forceValid = req.query.allow;

		if (!validURI.isWebUri(url) && !forceValid){
			return res.json({error: "Please enter valid url"});
		} 

		collection.count({}, function(err, count){
			if (err) {
				throw err;
			}
			var nextIndex = count + 1;
			var shortenUrl = 'http://' + req.headers.host + '/' + nextIndex;
			var urlPair = {_id: nextIndex, original_url: url, short_url: shortenUrl};

			collection.insert(urlPair, function(err){
				if (err) {
					throw err;
				}
				collection.findOne({'_id': nextIndex}, {'_id':false}, function(err, doc){
					if (err) {
						throw err;
					}
					res.json(doc);
				});
			});		
		});
	}

	this.redirectUrl = function(req, res) {
		var shortIndex = req.params.short;
		var shortenUrl = 'http://' + req.headers.host + '/' + shortIndex;

		collection.findOne({'short_url': shortenUrl}, {'_id': false}, function(err, doc){
			if (err) {
				throw err;
			}
			if (doc){
				res.redirect(doc.original_url);	
			} else {
				res.json({error: "no such short url found!"});
			}
			
		});
	}

}

module.exports = InputHandler;