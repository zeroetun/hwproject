function SearchCtrl($scope, $http) {
    $scope.url = 'http://localhost:8080/api/visitors'; // The url of our search
         
    // The function that will be executed on button click (ng-click="search()")
    $scope.search = function() {
         
        // Create the http post request
        // the data holds the keywords
        // The request is a JSON request.
        $http.get($scope.url).
        success(function(data, status) {
            $scope.result = data; // Show result from server in our <pre></pre> element
        }).
        error(function(data, status) {
            $scope.result = data || "Request failed";            
        });
    };
}