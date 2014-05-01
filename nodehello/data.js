var  mongo = require('mongodb');
var url = 'mongodb://127.0.0.1:27017/';
var database = 'hello';


function addVisitor(country, city) {
	mongo.connect(url + database, function(err, db) {
		if (err) throw err;
		console.log('Connected to database : ' + database );
		var document = {};
		document.country = country;
		document.city = city;

		db.collection('messages').insert(document, function(err, records) {
            if (err) throw err;
            console.log("Record added as " + records[0]._id);
		});

	});
}

module.exports = addVisitor