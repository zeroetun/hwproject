// Inspiraded by http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');


app.use(express.static('..\\angular-hw\\app'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
router.route('/visitor')
    // register a visitor (accessed at POST http://localhost:8080/api/visitorss)
    .post(function(req, res) {      
        var visitor = new Visitor();
        visitor.country = req.body.country;
        visitor.city = req.body.city;
        visitor.date = new Date();

        visitor.save(function(err) {
            if (err) res.send(err);
            res.json({_id: visitor._id });
        });      
    });

router.route('/visitor/:id')
    .delete(function(req, res) {
        Visitor.remove({_id: req.params.id}, function(err, visitor) {
            if (err) res.send(err);
            res.end();
        });
    });

router.route('/visitors')
    .get(function(req, res) {
        Visitor.find(function(err, visitors) {
            if (err) res.send(err);
            res.json({count: visitors.length, visitors: visitors});
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// BASE SETUP
// =============================================================================
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/hello'); // connect to our database

var Visitor = require('./models/visitor');