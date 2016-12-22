'use strict';

angular.module('guiaGasto').controller('ExtratoCtrl', [
    '$scope',
    'MovimentoService',
    'SaldoService',
    '$mdMedia',
    '$mdDialog',
    function($scope, MovimentoService, SaldoService, $mdMedia, $mdDialog) {

        $scope.dataInicial = moment().startOf('month').toDate();
        $scope.dataFinal = moment().endOf('month').toDate();

        var obterMovimento = function() {

            var datas = {
                dataInicial: $scope.dataInicial.getTime(),
                dataFinal: $scope.dataFinal.getTime()
            };

            MovimentoService.obterMovimentosPorFolha($scope.usuarioLogado.folhaSelecionada, datas)
                .then(function(movimentos) {
                    $scope.movimentos = movimentos.data;
                    if ($scope.movimentos && $scope.movimentos.length > 0) {
                        SaldoService.obterSaldoPorFolha($scope.usuarioLogado.folhaSelecionada, datas)
                            .then(function(saldos) {
                                _.each(saldos.data, function(saldo) {
                                    var movimento = _.find($scope.movimentos, { _id: saldo.codigoMovimento });
                                    movimento.saldo = saldo.saldo;
                                    movimento._show = false;
                                });
                            }).catch(function(err) {
                                console.log(err);
                            });
                    }
                }).catch(function(err) {
                    console.log(err);
                });
        };

        obterMovimento();

        var atualizarExtrato = function(datas) {
            $scope.dataInicial = datas.dataInicial;
            $scope.dataFinal = datas.dataFinal;
            obterMovimento();
        };

        function DataModalCtrl($scope, datas) {
            $scope.datas = datas;

            $scope.fechar = function() {
                $mdDialog.hide();
            }

            $scope.filtrar = function() {
                console.log(datas);
                atualizarExtrato(datas);
                $scope.fechar();
            }
        }

        $scope.abrirDataModal = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
                controller: DataModalCtrl,
                templateUrl: 'app/modules/extrato/selecionar-data.modal.html',
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    datas: {
                        dataInicial: $scope.dataInicial,
                        dataFinal: $scope.dataFinal
                    }
                }
            });
        }
    }
]);