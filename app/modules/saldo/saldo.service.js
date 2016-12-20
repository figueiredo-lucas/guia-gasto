angular.module('guiaGasto').factory('SaldoService', [
    '$http',
    function($http) {
        return {
            obterSaldoAtual: function(folha) {
                return $http.get('rest/saldos/atual/' + folha._id);
            },
            obterSaldoPorFolha: function(folha) {
                return $http.get('rest/saldos/folha/' + folha._id);
            }
        }
    }
]);