'use strict';

angular.module('guiaGasto').controller('MovimentoCtrl', [
    '$scope',
    '$http',
    function($scope, $http) {
        $scope.fields = {
            codigoFolha: $scope.usuarioLogado.folhaSelecionada._id,
            tipo: 'E'
        };

        $scope.tipos = ['E', 'S'];

        $http.get('rest/movimentos/folha/' + $scope.usuarioLogado.folhaSelecionada._id).then(function(movimentos) {
            $scope.movimentos = movimentos.data;
        });

        $scope.$watch('movimentos', function(movimentos, old) {
            if (movimentos && movimentos.length > 0 && old && movimentos.length != old.length) {
                $scope.$emit('atualizar-saldo');
            }
        }, true);

        $scope.filtrar = function(movimento) {
            return _.includes($scope.tipos, movimento.tipo);
        }
    }
]);