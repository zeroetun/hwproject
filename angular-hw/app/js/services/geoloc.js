  app.service("Localisation", function ($http,$q,Visitor,Error){


    this.getpos = function (){
        var defer = $q.defer();
        html5loc().then(function(visitor){
              defer.resolve(visitor);
        },
        function(error){
            iploc().then(function(visitor){
                 defer.resolve(visitor);
            });
        }); 
        return defer.promise;     
    }

    html5loc = function(){
        var defer = $q.defer();
        if (!navigator.geolocation) {
            defer.reject();
        }
      navigator.geolocation.getCurrentPosition(function(position){
        var visitor = new Visitor(position.coords.longitude, position.coords.latitude);
         defer.resolve(visitor);     
    },
    function(error){
     console.log(Error.getError(error))
     defer.reject();   
    });
     return defer.promise;
      
}


iploc = function(){
  var defer = $q.defer();
  $http.jsonp("http://www.telize.com/geoip?callback=JSON_CALLBACK").
  success(function(data, status) {
    var visitor = new Visitor(data.longitude, data.latitude);
     defer.resolve(visitor);
});
  return defer.promise;
}

}
);


app.value('Error', {
    getError : function (error) {

        switch (error.code) {
            case error.PERMISSION_DENIED:
            error = "User denied the request for Geolocation."
            break;
            case error.POSITION_UNAVAILABLE:
            error = "Location information is unavailable."
            break;
            case error.TIMEOUT:
            error = "The request to get user location timed out."
            break;
            case error.UNKNOWN_ERROR:
            error = "An unknown error occurred."
            break;
        }
        return error;
    }

});


