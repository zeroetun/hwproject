function SearchCtrl($scope, $http) {
    $scope.url = 'http://localhost:8080/api/'; // The url of our search
    $scope.id = "536b9edeac1031d013000001";
         
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
        $http.delete($scope.url+"/visitor/"+$scope.id).
        success(function(data, status) {
             $scope.result = "success"; // Show result from server in our <pre></pre> element
        }).
        error(function(data, status) {
            $scope.result = data || "Delete failed";            
        });
    }
}