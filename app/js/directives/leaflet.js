(function() {

    var leafletDirective = angular.module("leaflet", []);

    function manageSvgData(map, scope) {
	d3.select("svg").remove();
        var svg = d3.select(map.getPanes().overlayPane).append("svg"),
            g = svg.append("g");

        return function(collection) {
            var bounds = d3.geo.bounds(collection),
                path = d3.geo.path().projection(project);

            var feature = g.selectAll("path").data(collection.features).enter().append("path");

	    g.on("mousemove", function(d) {
		scope.mouse.x = d3.event.x;
		scope.mouse.y = d3.event.y;
                scope.$apply();
            });

            feature.on("mouseover", function(d) {
                scope.country.code = d.properties.countryCode;
                scope.country.name = d.properties.name;

                if (d.properties.name.length < 7) {
                    scope.country.nameSize = "extrabig";
		} else if (d.properties.name.length < 14) {
                    scope.country.nameSize = "big";
                } else if (d.properties.name.length < 25) {
                    scope.country.nameSize = "medium";
                } else {
                    scope.country.nameSize = "small";
                }
                scope.$apply();
            });

	    feature.on("mouseout", function(d) {
		scope.country.code = undefined;
                scope.$apply();
	    });

            map.on("viewreset", reset);
            reset();

            // Reposition the SVG to cover the features.
            function reset() {
                var bottomLeft = project(bounds[0]),
                    topRight = project(bounds[1]);

                svg.attr("width", topRight[0] - bottomLeft[0]).attr("height", bottomLeft[1] - topRight[1]).style("margin-left", bottomLeft[0] + "px").style("margin-top", topRight[1] + "px");
                g.attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");
                feature.attr("d", path);
            }

            // Use Leaflet to implement a D3 geographic projection.
            function project(x) {
                var point = map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
                return [point.x, point.y];
            }
        }
    }

    leafletDirective.directive("leaflet", function($http, $log) {
        return {
            restrict: "E",
            replace: true,
            template: '<div class="map"></div>',
            scope: {
                country: "=",
                map: "=",
                mouse: "=",
            },
            link: function(scope, element, attrs, ctrl) {
                var $el = element[0],
                    options = {
                        zoomControl: false,
                        zoom: scope.map.zoom.actual || 2,
                        minZoom: scope.map.zoom.min || 6,
                        maxZoom: scope.map.zoom.max || 12,
                        lat: scope.map.lat || 40.094882122321145,
                        lng: scope.map.lng || -3.8232421874999996
                    };

                var map = new L.Map($el, options);
                L.tileLayer('/tiles/{z}/{x}/{y}.png').addTo(map);
        	var point = new L.LatLng(options.lat, options.lng);
        	map.setView(point, options.zoom);
		map.attributionControl.setPrefix('');

		scope.$watch("map.name", function(newval, oldval) {
                	d3.json("/api/countries/" + scope.map.name + "/geojson", manageSvgData(map, scope));
		});

		scope.$watch("map.center.lat", function(newval, oldval) {
			if (scope.map.center.lat === undefined) return;
        		var point = new L.LatLng(scope.map.center.lat, scope.map.center.lng);
        		map.setView(point, scope.map.zoom.actual);
		});

		var zoomFS = new L.Control.ZoomFS({ position: 'bottomright' }); 
		map.addControl(zoomFS);

		map.on('enterFullscreen', function(){
  			if(window.console) window.console.log('enterFullscreen');

  			if ($el.webkitEnterFullScreen) {
    				el.webkitEnterFullScreen();
  			} else {
    				if (el.mozRequestFullScreen) {
      					el.mozRequestFullScreen();
    				} else {
      					el.requestFullscreen();
    				}
  			}
  			el.ondblclick = exitFullscreen;
		});
		
		map.on('exitFullscreen', function(){
  			if(window.console) window.console.log('exitFullscreen');
		});

            }
        };
    });
}());
