
/*
 * GET home page.
 */

exports.index = function(req, res){

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

//connect away
MongoClient.connect('mongodb://127.0.0.1:27017/hello', function(err, db) {
  if (err) throw err;
  console.log("Connected to Database");

  //simple json record
	var document = {_id:"hello2", count:1};
  
	//insert record
	db.collection('messages').insert(document, function(err, records) {
		if (err) throw err;
		console.log("Record added as "+records[0]._id);
});
});



  res.render('index', { title: 'Express' });
  
  

};
