var data = require('./data');

data('France', 'Paris', callback);

function  callback(id) {
	console.log(id);
}