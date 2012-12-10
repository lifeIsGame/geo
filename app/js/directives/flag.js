(function() {

    var flagDirective = angular.module("flag", []);

    flagDirective.directive("flag", function($http, $log) {
        return {
            restrict: "E",
            replace: true,
            template: '<div class="flag" ng-class="mini"><img ng-src="{{flagImg}}" /><h3 ng-class="country.nameSize">{{ country.name }}</h3></div>',
            scope: {
                mouse: "=",
                country: "="
            },
            link: function(scope, element, attrs, ctrl) {
		if (attrs.mini) {
			scope.mini = "mini";
		}
		scope.$watch("mouse.x", function(n, o) {
			console.log(element, scope.mouse.x, scope.mouse.y);
		    if (attrs.mini) {
			element.css("left", scope.mouse.x + 10);
			element.css("top", scope.mouse.y + 10);
		    };
		});

		scope.$watch("country.code", function(newval, oldval) {
		    if (newval !== undefined) {
		    	if (attrs.mini) {
				scope.flagImg="/img/flags/48x32/" + scope.country.code + ".png";
			} else {
				scope.flagImg="/img/flags/96x64/" + scope.country.code + ".png";
			}
		    }
		});
            }
        };
    });

}());
