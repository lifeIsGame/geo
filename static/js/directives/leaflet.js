(function () {
   "use strict";
}());

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
            var mousedown = false;
            var dragging = false;

            g.on("mousemove", function(d) {
                if (mousedown) {
			dragging = true;
		}
		scope.mouse.x = d3.event.clientX;
		scope.mouse.y = d3.event.clientY;
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

            feature.on("mousedown", function() {
		mousedown = true;
            });

            feature.on("mouseup", function(d) {
                if (!dragging) {
			scope.click = d.properties.countryCode;
			scope.$digest();
                	scope.$apply();
		} else {
			dragging = false;
		}
		mousedown = false;
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
        };
    }

    leafletDirective.directive("leaflet", function($http, $log) {
        return {
            restrict: "E",
            replace: true,
            template: '<div class="map"></div>',
            scope: {
                country: "=",
                map: "=",
                click: "=",
                mouse: "="
            },
            link: function(scope, element, attrs, ctrl) {
                var $el = element[0],
                    options = {
                        zoomControl: false,
                        zoom: 2,
                        minZoom: 2,
                        maxZoom: 6,
                        lat: 40.094882122321145,
                        lng: -3.8232421874999996
                    };

                var map = new L.Map($el, options);
                L.tileLayer('/tiles/{z}/{x}/{y}.png').addTo(map);
                var point = new L.LatLng(options.lat, options.lng);
                map.setView(point, options.zoom);
		map.attributionControl.setPrefix('');

		scope.$watch("map.name", function(newval, oldval) {
			if (!newval) return;
                        d3.json("/api/countries/" + scope.map.name + "/geojson", manageSvgData(map, scope));
		});

		scope.$watch("map.center.lat", function(newval, oldval) {
			if (!newval) return;
                        var point = new L.LatLng(scope.map.center.lat, scope.map.center.lng);
                        map.setView(point, scope.map.zoom);
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
