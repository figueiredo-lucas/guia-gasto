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
                    if ($scope.folhas.length === 1) {
                        $scope.usuarioLogado.folhaSelecionada = $scope.folhas[0];
                        $scope.$emit('atualizar-saldo');
                    }
                    $cookieStore.put('usuario', $scope.usuarioLogado);
                }).catch(function(err) {
                    scope.$emit('toast', error.data, true);
                });
            }
        }, true);

        $scope.fields = {
            primeiraFolha: false,
            codigoUsuario: $scope.usuarioLogado._id,
            updateValue: function(dto) {
                if (dto && $scope.fields.primeiraFolha) {
                    dto.folhaPadrao = true;
                    $scope.fields.primeiraFolha = undefined;
                }
            }
        };

        if ($scope.folhas.length === 0) {
            $scope.fields.primeiraFolha = true;
        }

    }
]);