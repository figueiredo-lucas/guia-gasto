angular.module('guiaGasto').factory('MovimentoService', [
    '$http',
    'UtilService',
    function($http, UtilService) {
        return {
            obterMovimentosPorFolha: function(folha, datas) {
                var queryString = UtilService.parseQueryString(datas);
                return $http.get('rest/movimentos/folha/' + folha._id + '?' + queryString);
            }
        }


    }
]);