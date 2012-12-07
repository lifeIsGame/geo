(function() {

    var flagDirective = angular.module("flag", []);

    flagDirective.directive("flag", function($http, $log) {
        return {
            restrict: "E",
            replace: true,
            template: '<div class="flag" ng-class="mini"><img ng-src="{{flagImg}}" /><h3 ng-class="countryNameSize">{{ countryName }}</h3></div>',
            scope: {
                mousex: "=",
                mousey: "=",
                countryCode: "=",
                countryName: "=",
                countryNameSize: "="
            },
            link: function(scope, element, attrs, ctrl) {
		if (attrs.mini) {
			scope.mini = "mini";
		}
		scope.$watch("mousex", function(n, o) {
		    if (attrs.mini) {
			element.css("left", scope.mousex + 10);
			element.css("top", scope.mousey + 10);
		    };
		});

		scope.$watch("countryCode", function(newval, oldval) {
		    if (newval !== undefined) {
		    	if (attrs.mini) {
				scope.flagImg="/img/flags/48x32/" + scope.countryCode + ".png";
			} else {
				scope.flagImg="/img/flags/96x64/" + scope.countryCode + ".png";
			}
		    }
			
		});
            }
        };
    });

}());
