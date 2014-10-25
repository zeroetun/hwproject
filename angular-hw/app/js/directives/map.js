var map = angular.module("map",[])
.directive('myMap', function(){
	return {
		replace: true,
		// controller: function($scope, $element, $attrs, $transclude) {},
		restrict: 'A',
		//templateUrl: 'templates/maptemplate.html',
		template: '<div id="gmaps"></div>',
		link: function($scope, element, iAttrs, controller) {
				$scope.map = {
		        lat : "0",
		        lng : "0",
		        accuracy : "0",
		        myMap : undefined,
		        myMarkers : []
		    	};

				$scope.map.mapOptions = {
            	center: new google.maps.LatLng($scope.map.lat, $scope.map.lng),
            	zoom: 2,
            	mapTypeId: google.maps.MapTypeId.ROADMAP
        		}

        		$scope.map.myMap = new google.maps.Map(element[0], $scope.map.mapOptions);

        }
	};
});
	
