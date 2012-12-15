(function () {
   "use strict";
}());

(function() {

    var flagDirective = angular.module("flag", []);

    flagDirective.directive("flag", function($http, $log) {
        return {
            restrict: "E",
            replace: true,
            template: '<div class="flag mini"><img ng-src="{{flagImg}}" /><h3 ng-class="country.nameSize">{{ country.name }}</h3></div>',
            scope: {
                mouse: "=",
                country: "="
            },
            link: function(scope, element, attrs, ctrl) {
		scope.$watch("mouse.x", function(n, o) {
			element.css("left", scope.mouse.x + 10);
			element.css("top", scope.mouse.y + 10);
		});

		scope.$watch("country.code", function(newval, oldval) {
                    if (newval !== undefined) {
			scope.flagImg="/img/flags/48x32/" + scope.country.code + ".png";
                    }
		});
            }
        };
    });

}());
