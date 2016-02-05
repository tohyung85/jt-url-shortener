'use strict';

var InputHandler = require(process.cwd()+'/app/controllers/input-handler.server.js');

module.exports = function(app, db) {
	var inputHandler = new InputHandler(app, db);
	app.route('/new*')
		.get(inputHandler.insertNewUrl);
		
	app.route('/:short')
		.get(function(req,res){
			res.send(req.params.short);
		});

	app.route('/')
		.get(function(req, res){
			res.sendFile(process.cwd() + '/public/index.html');
		});		

}