var visitors = require('./visitors');
var mongoose = require('mongoose');
var Visitor = require('../models/visitor');

mongoose.connect('mongodb://127.0.0.1:27017/hello');

Visitor.remove({}, function(err, nRemoved) {
	if (err) throw err;
	console.log("Drop de la collection, eléments supprimés : ", nRemoved);
});

var newVisitorId;
var assert = require("assert")
describe('visitors', function(){
  	describe('#register()', function(){
    	it('should save without error', function(done){
      		visitors.register("longitude", "latitude", function(err, visitorId) {
				if (err) throw err;
				newVisitorId = visitorId;
				done();
			})
		});
    })
  })

var assert = require("assert")
describe('visitors', function(){
  	describe('#findAll()', function(){
    	it('should list 1 visitor', function(done){
      		visitors.findAll(function(err, visitors) {
				if (err) throw err;
				assert.equal(1, visitors.length);
				done();
			})
		});
    })
  })

var assert = require("assert")
describe('visitors', function(){
  	describe('#remove()', function(){
    	it('should remove specified visitor', function(done){
      		visitors.remove(newVisitorId, function(err, nRemoved) {
				if (err) throw err;
				assert.equal(1, nRemoved);
				done();
			})
		});
    })
  })

