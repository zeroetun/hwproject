app.service("httpService", function ($http,$q,Visitor){
	url = 'http://localhost:8080/api/'; // The url of our search

	this.postVisitor = function(visitor){
		var defer = $q.defer();
		var data = visitor.toJson();
		console.log(data);
		$http.post(url+"visitor", data)
			.success(function(data, status, headers, config) {
				defer.resolve(data._id);
  			})
  			.error(function(data, status, headers, config) {
    			throw new Error("Error");
  			});
  			return defer.promise; 
	 }

	this.getAllPos = function(){
	 	var defer = $q.defer();
	 	$http.get(url + "visitors")
	 	.success(function(data,status){
	 		var visitors = [];
	        for (i = 0; i < data.count; i++) {
	        	visitors.push(new Visitor(data.visitors[i].latitude, data.visitors[i].longitude))
	        }
	        defer.resolve(visitors);
	 	})
	  	return defer.promise; 
	}

	this.deleteVisitor = function(visitorId) {
		$http.delete(url + "visitor/" + visitorId);
	 }
})