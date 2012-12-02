(function () {

    var leafletDirective = angular.module("leaflet-directive", []);

    function manageSvgData(map) {
        var svg = d3.select(map.getPanes().overlayPane).append("svg"),
              g = svg.append("g");

        return function(collection) {
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
        }
    }

    leafletDirective.directive("leaflet", function ($http, $log) {
        return {
            restrict: "E",
            replace: true,
            transclude: true,
            template: '<div class="map"></div>',
            link: function (scope, element, attrs, ctrl) {
                var $el = element[0],
                    options = {
                        minZoom: attrs.minZoom || 12,
                        maxZoom: attrs.maxZoom || 6,
                        lat: attrs.lat || 40.094882122321145,
                        lng: attrs.lng || -3.8232421874999996
                    };

                var map = new L.Map($el, options);
                d3.json("world.geo.json/countries.geo.json", manageSvgData(map));
                L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

                // Default center of the map
                var point = new L.LatLng(options.lat, options.lng);
                map.setView(point, options.minZoom);
            }
        };
    });
}());
