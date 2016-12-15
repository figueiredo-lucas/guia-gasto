'use strict';

angular.module('guiaGasto').controller('MovimentoCtrl', [
    '$scope',
    '$http',
    function($scope, $http) {
        $scope.fields = {};

        // $http.get('rest/movimentos').success(function(movimentos) {
        //     $scope.movimentos = movimentos;
        // });
    }
]);