angular.module('example', [
    'isoCurrency'
])

.controller('AppCtrl', function($scope) {
    $scope.amount = 15.23;
    $scope.currencies = ['EUR', 'USD', 'JPY', 'OMR', 'GMD'];
});