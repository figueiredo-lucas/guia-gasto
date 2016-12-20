'use strict';

angular.module('guiaGasto').controller('SaldoCtrl', [
    '$rootScope',
    '$cookieStore',
    'SaldoService',
    function($rootScope, $cookieStore, SaldoService) {

        var buscarSaldo = function() {
            SaldoService.obterSaldoAtual($rootScope.usuarioLogado.folhaSelecionada).then(function(response) {
                $rootScope.usuarioLogado.saldo = response.data.saldo;
                $cookieStore.put('usuario', $rootScope.usuarioLogado);
            });
        }

        buscarSaldo();

        $rootScope.$on('atualizar-saldo', function(event) {
            buscarSaldo();
        });

    }
]);