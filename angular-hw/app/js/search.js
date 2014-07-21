var app = angular.module("search",["geo"])
.controller("SearchCtrl",function ($scope, $http) {
    $scope.url = 'http://localhost:8080/api/'; // The url of our search

<<<<<<< HEAD
       // The function that will be executed on button click (ng-click="search()")
    $scope.search = function() {
=======
        $http.jsonp("http://www.telize.com/geoip?callback=JSON_CALLBACK").
        success(function(data, status) {
            var data = {country: data.country, city: data.city, longitude: data.longitude, latitude: data.latitude}
        $http.post($scope.url + 'visitor', data)
            .success(function(data, status) {
                $scope.visitorId = data._id;
            })
            .error(function(data, status) {
            $scope.result = data || "Request failed";            
        });
            
        }).
        error(function(data, status) {
            $scope.result = data || "Request failed";            
        });
>>>>>>> 02fd1c0c131a3c3bd8655261679a194055d8c7c3

    $scope.hello = function() {
        $scope.model = { myMap: undefined };
        
        $http.get($scope.url + "/visitors")
            .success(function(data, status) {
                        $scope.myMarkers = [];
                        for (i = 0; i < data.count; i++) {
                                $scope.count = data.count;
                                var latlng = new google.maps.LatLng(data.visitors[i].latitude, data.visitors[i].longitude);
                                $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));
                        }
                        console.log(data);
                        console.log($scope.myMarkers);
                        $scope.showResult;

                    }
            )
            .error(function(data, status) 
                    {
                        $scope.result = data || "Request failed"; 
                    }
            )
    }


});


