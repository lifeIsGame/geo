(function () {
   "use strict";
}());

function PlayController($scope, $location, $http) {

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
		},
		find: {
			countries: undefined,
			actual: undefined,
			left: 0,
			correct: 0,
			pass: 0,
			error: 0
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

	$scope.$watch("click", function(newval, oldval) {
		if ($scope.find.left > 0 && newval) {
			
			if (newval === $scope.find.actual) {
				$scope.find.correct += 1;
			} else {
				$scope.find.error += 1;
			}
			next();
		}
	});
	
	function next() {
		var keys = _.keys($scope.find.countries);
		delete $scope.find.countries[$scope.find.actual];
		keys = _.keys($scope.find.countries);
		$scope.find.left = keys.length;
		if (keys.length === 0) {
			return false;
		}	
		var rand = Math.floor(Math.random()*keys.length)
		$scope.find.actual= keys[Math.floor(Math.random()*keys.length)];
		$scope.find.img = "/img/flags/96x64/" + $scope.find.actual + ".png";

		var country = $scope.find.countries[$scope.find.actual];

       		if (country < 7) {
       			$scope.find.nameSize = "extrabig";
       		} else if (country < 14) {
       			$scope.find.nameSize = "big";
       		} else if (country < 25) {
       			$scope.find.nameSize = "medium";
       		} else {
       			$scope.find.nameSize = "small";
       		}

		return true;
	}

	$scope.pass = function() {
		if (next()) {
			$scope.find.pass += 1;
			$scope.find.left -= 1;
		}
	}

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

		$http.get("/api/countries/" + map ).success(function(response) {
			var countries = response;
			var keys = _.keys(response);
			$scope.find.countries = response;
			$scope.find.left = keys.length;
			$scope.find.correct = 0;
			$scope.find.error = 0;
			$scope.find.pass = 0;
			$scope.find.actual= keys[Math.floor((Math.random()*keys.length)+1)];
			$scope.find.img = "/img/flags/96x64/" + $scope.find.actual + ".png";
		});
	}
}
