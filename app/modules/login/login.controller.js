'use strict';

angular.module('guiaGasto').controller('LoginCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    'LoginService',
    function($scope, $rootScope, $state, LoginService) {
        if (LoginService.usuarioLogado()) {
            return $state.go('base');
        }
        //criar lógica para verificar se estou logado, se sim, enviar para a tela base (base.inicio)

        $scope.acessar = function(dto) {
            $scope.frmLogin.$setSubmitted();
            if ($scope.frmLogin.$valid) {
                LoginService.acessar(dto, function(response) {
                    $rootScope.usuarioLogado = response;
                    if (response.folhas.length === 0) {
                        return $state.go('base.folha');
                    }
                    return $state.go('base');
                }, function(err) {
                    $scope.$emit('toast', err.data)
                });
            }
        };
    }
]);