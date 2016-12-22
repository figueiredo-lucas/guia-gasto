'use strict';

angular.module('guiaGasto').controller('MovimentoCtrl', [
    '$scope',
    'MovimentoService',
    function($scope, MovimentoService) {
        $scope.fields = {
            codigoFolha: $scope.usuarioLogado.folhaSelecionada._id,
            tipo: 'E'
        };

        $scope.tipos = ['E', 'S'];

        MovimentoService.obterMovimentosPorFolha($scope.usuarioLogado.folhaSelecionada).then(function(movimentos) {
            $scope.movimentos = movimentos.data;
        }).catch(function(err) {
            scope.$emit('toast', error.data, true);
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