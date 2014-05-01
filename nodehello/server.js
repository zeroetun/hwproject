var http = require('http');
var url = require('url');
var data = require('./data');

var port = process.argv[2];

http.createServer(function(request, response) {
	if(request.method=='POST') {
        var body='';
        request.on('data', function (data) {
            body +=data;
        });

        request.on('end',function(){
            postdata = body;
            console.log(postdata)
           handlePost(response, postdata)
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
     addVisitor(response, postdata)

}

function handleGet(response, urlparts) {
	console.log(urlparts);
	response.writeHead(200, {'Content-Type': 'application/json'});
	response.end('{post:0}' + '\n');
}

function reply(response,postdata){
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(postdata);
}

function addVisitor(response, jsondata) {
    console.log(jsondata)
    visitor = JSON.parse(jsondata)
    data(visitor.country, visitor.city, function(id){
        reply(response,'{"id":"' + id + '"}');
    });
    
} 


