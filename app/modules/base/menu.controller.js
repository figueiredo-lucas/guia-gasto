'use strict';

angular.module('guiaGasto').controller('MenuCtrl', [
    '$scope',
    '$state',
    '$location',
    '$http',
    '$mdSidenav',
    '$cookieStore',
    function($scope, $state, $location, $http, $mdSidenav, $cookieStore) {

        //criar lógica para verificar se estou logado, se não, redirecionar para a tela de login (login)

        var usuarioLogado = $cookieStore.get('usuario');
        if (!usuarioLogado) {
            $state.go('login');
        }

        $scope.isActive = function(route) {
            return ('/' + route.replace('base.', '')) === $location.path();
        };

        $scope.toggleLeft = function() {
            $mdSidenav('left').toggle();
        };

        $scope.logoff = function() {
            $cookieStore.remove('usuario');
            $state.go('login');
        }

    }
]);