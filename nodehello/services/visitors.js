var Visitor = require('../models/visitor');

var register = function(longitude, latitude) {
	var visitor = new Visitor();
	visitor.longitude = longitude;
	visitor.latitude = latitude;
	visitor.date = new Date();
	
	visitor.save();
}

var remove = function(id) {
	Visitor.remove({_id: id}, function(err, nRemoved) {
		if (err) console.log(err);
		console.log(nRemoved);
	});
}

var findAll = function() {
	Visitor.find(function(err, visitors) {
    	if (err) console.log(err);
    	console.log(visitors);
    });
}

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/hello'); // connect to our database

module.exports.register = register;
module.exports.remove = remove;
module.exports.findAll = findAll;

