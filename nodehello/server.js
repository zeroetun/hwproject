var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var visitors = require('./services/visitors');

app.use(express.static(__dirname+'/../angular-hw/app'));

app.use(bodyParser());

var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('URL requested : ' + req.url);
    next();
});

router.route('/visitor')
    .post(function(req, res) {      
        visitors.register(req.body.longiture, req.body.latitude, function(err, visitorId) {
            if (err) throw err;
            res.json(201, {_id: visitorId});
        })   
    });

router.route('/visitor/:id')
    .delete(function(req, res) {
        visitors.remove(req.params.id, function(err, nRemoved) {
            if (err) throw err;
        })
    });

router.route('/visitors')
    .get(function(req, res) {
        visitors.findAll(function(err, visitors) {
            if (err) throw err;
            res.json(201, {count: visitors.length, visitors: visitors});  
        })
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started at port : ' + port);

// BASE SETUP
// =============================================================================
var mongoose = require('mongoose'); 
mongoose.connect('mongodb://127.0.0.1:27017/hello');
