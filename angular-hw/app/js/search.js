var app = angular.module("app",["map"])
.controller("mainCtrl",function ($scope, $http, Localisation, httpService) {

    
    $scope.visitorId;


    // Localisation.getpos().then(function(visitor){
    //    httpService.postVisitor(visitor).then(function(id) {
    //         $scope.visitorId = id;
    //    });
    // })
  

    $scope.hello = function() {
   
         httpService.getAllPos().then(function(visitors){
            $scope.map.myMarkers.length = 0;
            for (var i = 0; i < visitors.length; i++) {         
              var latlng = new google.maps.LatLng(visitors[i].longitude, visitors[i].latitude);
              $scope.map.myMarkers.push(new google.maps.Marker({ map: $scope.map.myMap, position: latlng }));  
            }

         });

         console.log("zzz " + $scope.visitorId);
       
    }


    window.onbeforeunload = function (event) {

        // var message = 'Your position has been cleaned';
        // if (typeof event == 'undefined') {
        //     event = window.event;
        // }
        // if (event) {
        //     httpService.deleteVisitor($scope.visitorId);
        //     event.returnValue = message;
        //     return message;
        // }
        

    }

});


