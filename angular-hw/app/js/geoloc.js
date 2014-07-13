    var geo = angular.module("geo", ["ui.map","ui.event"]).controller("mapCtrl",['$q','$scope','$http','Error', function ($q,$scope,$http,Error){

       $scope.lat = "0";
       $scope.lng = "0";
       $scope.accuracy = "0";
       $scope.error = "";
       $scope.model = { myMap: undefined };
       $scope.myMarkers = [];
       var deferred = $q.defer();
       url = 'http://localhost:8080/api/'
       var data;


       $scope.showResult = function () {
        return $scope.error == "";
    }

    $scope.mapOptions = {
        center: new google.maps.LatLng($scope.lat, $scope.lng),
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.showPosition = function (position) {
        var data = {longitude : position.coords.longitude , latitude : position.coords.latitude}  
        console.log("html5" + data);
        $http.post(url+"/visitor", data);
        
    }

    $scope.showError = function (error) {
     $scope.error = Error.getError(error)
     $http.jsonp("http://www.telize.com/geoip?callback=JSON_CALLBACK").
     success(function(data, status) {
        console.log("hkh" + data);
        var data =  {longitude : data.longitude , latitude : data.latitude};
        $http.post(url+"/visitor", data);
    });
 }


 if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
}
else {
 $http.jsonp("http://www.telize.com/geoip?callback=JSON_CALLBACK").
 success(function(data, status) {
    console.log("hkh" + data);
    var data =  {longitude : data.longitude , latitude : data.latitude};
    $http.post(url+"/visitor", data);
});
 
}  



}]);



    geo.value('Error', {
        getError : function (error) {
            var error;
            console.log("Error");
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



