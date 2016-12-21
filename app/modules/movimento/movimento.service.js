angular.module('guiaGasto').factory('MovimentoService', [
    '$http',
    function($http) {
        return {
            obterMovimentosPorFolha: function(folha) {
                return $http.get('rest/movimentos/folha/' + folha._id);
            }
        }
    }
]);