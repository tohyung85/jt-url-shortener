'use strict';

var InputHandler = function(app,db) {

	var collection = db.collection('urlDatabase');

	this.insertNewUrl = function(req, res) {
		var unfilteredStr = req.path;
		var url = unfilteredStr.substring(5);		

		collection.count({}, function(err, count){

			if (err) {
				throw err;
			}

			var nextIndex = count + 1;
			var shortenUrl = 'http://' + req.headers.host + '/' + nextIndex;
			var urlPair = {original_url: url, short_url: shortenUrl};
			res.json(urlPair);
		});
	}

}

module.exports = InputHandler;