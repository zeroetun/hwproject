var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VisitorSchema   = new Schema({
	country: String,
	city: String,
	date: Date,
	longitude: String,
	latitude: String
});

module.exports = mongoose.model('Visitor', VisitorSchema);
