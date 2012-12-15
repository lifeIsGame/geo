function DiscoverController($scope, $location, $http) {

	var url = $location.absUrl();
	var r = /\/(asia|world|africa)\/discover/;
	var map = url.match(r)[1];

	$scope.map = { name: map, center: { lat: 40.094882122321145, lng: -3.8232421874999996 }, zoom: { actual: 2, max: 5, min: 2 } };
	$scope.mouse = { x: undefined, y: undefined };
	$scope.country = { code: undefined, name: undefined, nameSize: undefined };

	$scope.$watch("map.name", function(newval, oldval) {
		$http.get("/api/maps/" + $scope.map.name + "/config").success(function(response) {
			angular.extend($scope, {
				map: {
					name: newval,
    					center: { lat: response.center.lat, lng: response.center.lng },
    					zoom: {
						actual: response.zoom.actual,
						max: response.zoom.max,
						min: response.zoom.min
					}
				}
			});
		});
	});

}
