var app = angular.module("search",["geo"])
.controller("SearchCtrl",function ($scope, $http) {
    $scope.url = 'http://localhost:8080/api/'; // The url of our search
             
    // The function that will be executed on button click (ng-click="search()")
    $scope.search = function() {
         
        // Create the http post request
        // the data holds the keywords
        // The request is a JSON request.
        $http.get($scope.url+"/visitors").
        success(function(data, status) {
            console.log(data);
            $scope.result = data; // Show result from server in our <pre></pre> element
        }).
        error(function(data, status) {
            $scope.result = data || "Request failed";            
        });
    };

    $scope.delete = function() {
        $http.delete($scope.url+"/visitor/"+$scope.visitorId).
        success(function(data, status) {
            $scope.search();
        }).
        error(function(data, status) {
            $scope.result = data || "Delete failed";            
        });
    }


    $scope.iAmHere = function() {
        var data = {country: $scope.country, city: $scope.city}
        $http.post($scope.url + 'visitor', data)
            .success(function(data, status) {
                $scope.visitorId = data._id;
                $scope.search();
               
                
            })
            .error(function(data, status) {
            $scope.result = data || "Request failed";            
        });
    }
});

