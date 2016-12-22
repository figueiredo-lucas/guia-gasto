angular.module('guiaGasto').factory('SaldoService', [
    '$http',
    'UtilService',
    function($http, UtilService) {
        return {
            obterSaldoAtual: function(folha) {
                return $http.get('rest/saldos/atual/' + folha._id);
            },
            obterSaldoPorFolha: function(folha, datas) {
                var queryString = UtilService.parseQueryString(datas);
                return $http.get('rest/saldos/folha/' + folha._id + '?' + queryString);
            }
        }
    }
]);