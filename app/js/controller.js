function WorldCtrl($scope) {
    $scope.$watch("country_name", function(n, o) {
        console.log("AHORA ME ENTERO", n);
    })
}
