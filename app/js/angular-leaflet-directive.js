(function () {

	var leafletDirective = angular.module("leaflet-directive", []);

	leafletDirective.directive("leaflet", function ($http, $log) {
		return {
			restrict: "E",
			replace: true,
			transclude: true,
			scope: {
				center: "=center",
				marker: "=marker",
				message: "=message",
				zoom: "=zoom"
			},
			template: '<div class="thumbnail"><div class="map"></div></div>',
			link: function (scope, element, attrs, ctrl) {
                var $el = element.find(".map")[0],
				    map = new L.Map($el);

                var svg = d3.select(map.getPanes().overlayPane).append("svg"),
                    g = svg.append("g");

                d3.json("world.geo.json/countries.geo.json", function(collection) {
  var bounds = d3.geo.bounds(collection),
      path = d3.geo.path().projection(project);

  var feature = g.selectAll("path")
      .data(collection.features)
    .enter().append("path");

  map.on("viewreset", reset);
  reset();

  // Reposition the SVG to cover the features.
  function reset() {
    var bottomLeft = project(bounds[0]),
        topRight = project(bounds[1]);

    svg .attr("width", topRight[0] - bottomLeft[0])
        .attr("height", bottomLeft[1] - topRight[1])
        .style("margin-left", bottomLeft[0] + "px")
        .style("margin-top", topRight[1] + "px");

    g   .attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");

    feature.attr("d", path);
  }

  // Use Leaflet to implement a D3 geographic projection.
  function project(x) {
    var point = map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
    return [point.x, point.y];
  }

                });

			    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 12 }).addTo(map);

                // Default center of the map
                var point = new L.LatLng(40.094882122321145, -3.8232421874999996);
                map.setView(point, 5);

                scope.$watch("center", function(center) {
                    if (center === undefined) return;

                    // Center of the map
                    center = new L.LatLng(scope.center.lat, scope.center.lng);
                    var zoom = scope.zoom || 8;
                    map.setView(center, zoom);

                    var marker = new L.marker(scope.center, { draggable: attrs.markcenter ? false:true });
			        if (attrs.markcenter || attrs.marker) {
                        map.addLayer(marker);

                        if (scope.message) {
                            marker.bindPopup("<strong>" + scope.message + "</strong>", { closeButton: false });
                            marker.openPopup();
                        }
                        if (attrs.marker) {
                            scope.marker.lat = marker.getLatLng().lat;
                            scope.marker.lng = marker.getLatLng().lng;
                        }
		            }

                    // Listen for map drags
                    var dragging_map = false;
                    map.on("dragstart", function(e) {
                        dragging_map = true;
                    });

		            map.on("drag", function (e) {
			            scope.$apply(function (s) {
				            s.center.lat = map.getCenter().lat;
				            s.center.lng = map.getCenter().lng;
			            });
		            });

                    map.on("dragend", function(e) {
                        dragging_map= false;
                    });

                    scope.$watch("center.lng", function (newValue, oldValue) {
                        if (dragging_map) return;
                        map.setView(new L.LatLng(map.getCenter().lat, newValue), map.getZoom());
                    });

                    scope.$watch("center.lat", function (newValue, oldValue) {
                        if (dragging_map) return;
                        map.setView(new L.LatLng(newValue, map.getCenter().lng), map.getZoom());
                    });

                    // Listen for zoom
                    scope.$watch("zoom", function (newValue, oldValue) {
                        map.setZoom(newValue);
                    });

		            map.on("zoomend", function (e) {
			            scope.zoom = map.getZoom();
			            scope.$apply();
		            });

                    if (attrs.marker) {

                        var dragging_marker = false;

		                // Listen for marker drags
			            (function () {

                            marker.on("dragstart", function(e) {
                                dragging_marker = true;
                            });

				            marker.on("drag", function (e) {
					            scope.$apply(function (s) {
						            s.marker.lat = marker.getLatLng().lat;
						            s.marker.lng = marker.getLatLng().lng;
					            });
				            });

                            marker.on("dragend", function(e) {
                                marker.openPopup();
                                dragging_marker = false;
                            });

                            map.on("click", function(e) {
                                marker.setLatLng(e.latlng);
                                marker.openPopup();
					            scope.$apply(function (s) {
						            s.marker.lat = marker.getLatLng().lat;
						            s.marker.lng = marker.getLatLng().lng;
					            });
                            });

                            scope.$watch("marker.lng", function (newValue, oldValue) {
                                if (dragging_marker) return;
                                marker.setLatLng(new L.LatLng(marker.getLatLng().lat, newValue));
                            });

                            scope.$watch("marker.lat", function (newValue, oldValue) {
                                if (dragging_marker) return;
                                marker.setLatLng(new L.LatLng(newValue, marker.getLatLng().lng));
                            });

			            }());

		            }

                });

            }
		};
	});

}());
