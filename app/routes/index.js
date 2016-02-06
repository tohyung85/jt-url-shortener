'use strict';

var InputHandler = require(process.cwd()+'/app/controllers/input-handler.server.js');

module.exports = function(app, db) {
	var inputHandler = new InputHandler(app, db);
	app.route('/new*')
		.get(inputHandler.insertNewUrl);
		
	app.route('/:short')
		.get(inputHandler.redirectUrl);

	app.route('/')
		.get(function(req, res){
			res.sendFile(process.cwd() + '/public/index.html');
		});		

}