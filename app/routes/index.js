'use strict';

module.exports = function(app, db) {

	app.route('/new*')
		.get(function(req,res){
			res.sendFile(process.cwd() + '/public/input-invalid.html');
			console.log(req.path);
			if (req.query.allow){
				console.log(req.query.allow);	
			}			
		});
		
	app.route('/:short')
		.get(function(req,res){
			res.send(req.params.short);
		});

	app.route('/')
		.get(function(req, res){
			res.sendFile(process.cwd() + '/public/index.html');
		});		

}