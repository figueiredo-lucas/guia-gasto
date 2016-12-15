'use strict';

angular.module('guiaGasto').controller('LoginCtrl', [
    '$scope',
    '$state',
    '$cookieStore',
    function($scope, $state, $cookieStore) {
        var usuarioLogado = $cookieStore.get('usuario');
        if (usuarioLogado) {
            $state.go('base');
        }
        //criar lógica para verificar se estou logado, se sim, enviar para a tela base (base.inicio)

        $scope.acessar = function(dto) {
            $cookieStore.put('usuario', dto);
            $state.go('base');
        };

    }
]);