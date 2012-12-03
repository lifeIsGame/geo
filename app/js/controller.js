function WorldCtrl($scope) {
    $scope.$watch("code", function(n, o) {
        console.log(n, o);
    })
}
