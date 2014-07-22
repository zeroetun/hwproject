var app = angular.module("app",["ui.map","ui.event"])
.controller("mainCtrl",function ($scope, $http, Localisation, httpService) {

    $scope.map = {
        lat : "0",
        lng : "0",
        accuracy : "0",
        myMap : undefined,
        myMarkers : [],
    };

    $scope.map.mapOptions = {
            center: new google.maps.LatLng($scope.map.lat, $scope.map.lng),
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

    Localisation.getpos().then(function(visitor){
        console.log("pos" + visitor.longitude);
       httpService.postVisitor(visitor);
    })
  

    $scope.hello = function() {
   
         httpService.getAllPos().then(function(visitors){
            $scope.map.myMarkers.length = 0;
            for (var i = 0; i < visitors.length; i++) {         
              var latlng = new google.maps.LatLng(visitors[i].longitude, visitors[i].latitude);
              $scope.map.myMarkers.push(new google.maps.Marker({ map: $scope.map.myMap, position: latlng }));  
            }

         });
       
    }

    $scope.leaving = function() {
        httpService.deleteVisitor("53ce818818bd6ed823000001");
    }

    // MARCHE PAS 
    // window.onbeforeunload = function (event) {
    //     var message = 'Sure you want to leave?';
    //     if (typeof event == 'undefined') {
    //         event = window.event;
    //     }
    //     if (event) {
    //         event.returnValue = message;
    //     }
    //     httpService.deleteVisitor("53ce818818bd6ed823000001");

    //     return message;
    // }

    // $scope.$on("$destroy", function() {
    //     httpService.deleteVisitor("53ce850989d7ebd124000001");
    // });

});


