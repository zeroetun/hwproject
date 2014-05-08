function SearchCtrl($scope, $http) {
    $scope.url = 'http://localhost:8080/api/visitors'; // The url of our search
         
    // The function that will be executed on button click (ng-click="search()")
    $scope.search = function() {
         
        // Create the http post request
        // the data holds the keywords
        // The request is a JSON request.
        $http({ method: 'GET', url: 'http://localhost:8080/api/visitors' }).
        success(function(data, status) {
            console.log("test" + data)
            $scope.result = data; // Show result from server in our <pre></pre> element
        })
        .
        error(function(data, status) {
            console.log("error" + data)
            $scope.result = data || "Request failed";            
        });
    };
}