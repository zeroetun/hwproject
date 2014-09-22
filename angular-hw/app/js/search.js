var app = angular.module("app",["ui.map","ui.event"])
.controller("mainCtrl",function ($scope, $http, Localisation, httpService) {

    $scope.visitorId;

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
       httpService.postVisitor(visitor).then(function(id) {
            $scope.visitorId = id;
       });
    })
  

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

        var message = 'Your position has been cleaned';
        if (typeof event == 'undefined') {
            event = window.event;
        }
        if (event) {
            httpService.deleteVisitor($scope.visitorId);
            event.returnValue = message;
            return message;
        }
        

    }

});


