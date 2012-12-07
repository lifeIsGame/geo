(function() {

    var flagDirective = angular.module("flag", []);

    flagDirective.directive("flag", function($http, $log) {
        return {
            restrict: "E",
            replace: true,
            template: '<img ng-src="{{flagImg}}"></div>',
            scope: {
                countryCode: "=",
            },
            link: function(scope, element, attrs, ctrl) {
		scope.$watch("countryCode", function(newval, oldval) {
		    if (newval !== undefined) {
			scope.flagImg="/img/flags/96x64/" + scope.countryCode + ".png";
		    }
		});
            }
        };
    });
}());
