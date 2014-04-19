
/**
 * Module dependencies.
 */
 
 require('./response');

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.post('/', function (req, res) {
 if ('undefined' != typeof req.body.id) {
    res.respond(new Error('Bookmark ID must not be defined'), 400);
  } else {
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

//connect away
MongoClient.connect('mongodb://127.0.0.1:27017/hello', function(err, db) {
  if (err) throw err;
  console.log("Connected to Database");

  //simple json record
	var document = {_id:"hello3", count:1};
  
	//insert record
	db.collection('messages').insert(document, function(err, records) {
		if (err) throw err;
		console.log("Record added as "+records[0]._id);
});
});

	res.respond('hello3', 201);
  }
}); 

app.get('/', routes.index);
app.get('/users', user.list);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

