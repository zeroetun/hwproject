var Visitor = require('../models/visitor');

var register = function(longitude, latitude, callback) {
	var visitor = new Visitor();
	visitor.longitude = longitude;
	visitor.latitude = latitude;
	visitor.date = new Date();
	
	visitor.save(function(err, visitorId) {
		callback(err, visitor._id);
	});
}

var remove = function(id, callback) {
	Visitor.remove({_id: id}, function(err, nRemoved) {
		callback(err, nRemoved);
	});
}

var findAll = function(callback) {
	Visitor.find(function(err, visitors) {
    	callback(err, visitors);
    });
}




module.exports.register = register;
module.exports.remove = remove;
module.exports.findAll = findAll;

