'use strict';

angular.module('guiaGasto').controller('SenhaTemporariaCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    'LoginService',
    function($scope, $rootScope, $state, LoginService) {
        $scope.dto = {
            senhaTemporaria: false
        };
        if (LoginService.usuarioLogado()) {
            if (!LoginService.usuarioLogado().senhaTemporaria) {
                return $state.go('base.inicio');
            }
            $scope.dto.login = LoginService.usuarioLogado().login;
        } else {
            return $state.go('base.login');
        }

        var criarNovoUsuario = function(response) {
            var novoUsuario = angular.copy($scope.dto);
            novoUsuario.senha = novoUsuario.senhaNova;
            novoUsuario._id = response._id;
            return novoUsuario;
        }

        $scope.atualizarSenhaTemporaria = function() {
            $scope.frmLogin.$setSubmitted();
            if ($scope.frmLogin.$valid) {
                LoginService.acessar($scope.dto, function(response) {
                    var novoUsuario = criarNovoUsuario(response);
                    LoginService.atualizarSenhaTemporaria(novoUsuario, function(usr) {
                        $rootScope.usuarioLogado = usr;
                        if (usr.folhas.length === 0) {
                            return $state.go('base.folha');
                        }
                        return $state.go('base.inicio');
                    });
                }, function(err) {
                    $scope.$emit('toast', err.data, true);
                });
            }
        };
    }
]);