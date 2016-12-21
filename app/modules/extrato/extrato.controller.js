'use strict';

angular.module('guiaGasto').controller('ExtratoCtrl', [
    '$scope',
    'MovimentoService',
    'SaldoService',
    function($scope, MovimentoService, SaldoService) {

        $scope.dataInicial = moment().startOf('month').toDate();
        $scope.dataFinal = moment().endOf('month').toDate();

        MovimentoService.obterMovimentosPorFolha($scope.usuarioLogado.folhaSelecionada).then(function(movimentos) {
            $scope.movimentos = movimentos.data;
            SaldoService.obterSaldoPorFolha($scope.usuarioLogado.folhaSelecionada).then(function(saldos) {
                _.each(saldos.data, function(saldo) {
                    var movimento = _.find($scope.movimentos, { _id: saldo.codigoMovimento });
                    movimento.saldo = saldo.saldo;
                    movimento._show = false;
                });
            });
        });
    }
]);