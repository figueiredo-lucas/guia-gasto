'use strict';

angular.module('guiaGasto').controller('LoginCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    'LoginService',
    function($scope, $rootScope, $state, LoginService) {

        if (LoginService.usuarioLogado()) {
            if (LoginService.usuarioLogado().senhaTemporaria) {
                return $state.go('senhaTemporaria');
            } else {
                return $state.go('base.inicio');
            }
        }

        $scope.acessar = function(dto) {
            $scope.frmLogin.$setSubmitted();
            if ($scope.frmLogin.$valid) {
                LoginService.acessar(dto, function(response) {
                    $rootScope.usuarioLogado = response;
                    if (response.senhaTemporaria) {
                        return $state.go('senhaTemporaria');
                    } else {
                        if (response.folhas.length === 0) {
                            return $state.go('base.folha');
                        }
                        return $state.go('base.inicio');
                    }
                }, function(err) {
                    $scope.$emit('toast', err.data, true);
                });
            }
        };
    }
]);