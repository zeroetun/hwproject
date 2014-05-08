function SearchCtrl($scope, $http) {
    $scope.url = 'http://localhost:8080/api/'; // The url of our search
         
    // The function that will be executed on button click (ng-click="search()")
    $scope.search = function() {
         
        // Create the http post request
        // the data holds the keywords
        // The request is a JSON request.
        $http.get($scope.url).
        success(function(data, status) {
            console.log(data);
            $scope.result = data; // Show result from server in our <pre></pre> element
        }).
        error(function(data, status) {
            $scope.result = data || "Request failed";            
        });
    };

    $scope.iAmHere = function() {
        var data = {country: $scope.country, city: $scope.city}
        $http.post($scope.url + 'visitor', data)
            .success(function(data, status) {
                $scope.visitorId = data._id;
                
            })
            .error(function(data, status) {
            $scope.result = data || "Request failed";            
        });
    }
}
