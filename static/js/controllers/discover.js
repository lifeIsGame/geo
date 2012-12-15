(function () {
   "use strict";
}());

function DiscoverController($scope, $location, $http) {

	angular.extend($scope, {
		map: {
			name: undefined,
			center: {
				lat: undefined,
				lng: undefined
			},
			zoom: undefined
		},
		mouse: {
			x: undefined,
			y: undefined
		},
		country: {
			code: undefined,
			name: undefined,
			nameSize: undefined
		}
	});

	var path = $location.path();
	var map = "world";

	if (!path) {
		$location.path("/world");
	} else {
		map = path.substr(1, path.length);
	}

	loadMap(map);

	$scope.$watch("map.name", function(newval, oldval) {
		if (oldval) loadMap(newval);
	});

	function loadMap(map) {
		$http.get("/api/maps/" + map + "/config").success(function(response) {
			$scope.map = {
					name: map,
					center: {
						lat: response.center.lat,
						lng: response.center.lng 
					},
					zoom: response.zoom
			};
		});
	}
}
