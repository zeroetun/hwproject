var http = require('http');
var qs = require('querystring');
var url = require('url');

var port = process.argv[2];

http.createServer(function(request, response) {
	if(request.method=='POST') {
        var body='';
        request.on('data', function (data) {
        	body +=data;
        });
        request.on('end',function(){
            var postdata =  qs.parse(body);
            handlePost(response, postdata);
            });

        
    }
    else if(request.method=='GET') {
        var urlparts = url.parse(request.url,true);
        handleGet(response, urlparts);
    }
}).listen(port)

console.log('Server listening on ' + port);

function handlePost(response, postdata) {
	console.log(postdata);
	response.writeHead(200, {'Content-Type': 'application/json'});
	response.end('{post:1}' + '\n');
}

function handleGet(response, urlparts) {
	console.log(urlparts);
	response.writeHead(200, {'Content-Type': 'application/json'});
	response.end('{post:0}' + '\n');
}

