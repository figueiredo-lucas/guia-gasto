'use strict';

angular.module('guiaGasto').controller('FolhaCtrl', [
    '$scope',
    '$cookieStore',
    'FolhaService',
    function($scope, $cookieStore, FolhaService) {

        $scope.folhas = $scope.usuarioLogado.folhas;

        $scope.$watch('folhas', function(folhas, folhasOld) {
            if (!_.isEqual(folhas, folhasOld)) {
                FolhaService.obterFolhaPorUsuario($scope.usuarioLogado).then(function(response) {
                    $scope.usuarioLogado.folhas = response.data;
                    $scope.folhas = response.data;
                    $cookieStore.put('usuario', $scope.usuarioLogado);
                });
            }
        }, true);

        $scope.fields = {
            primeiraFolha: false,
            codigoUsuario: $scope.usuarioLogado._id
        };

        if ($scope.folhas.length === 0) {
            $scope.fields.primeiraFolha = true;
        }

    }
]);