angular.module('guiaGasto').factory('FolhaService', [
    '$http',
    function($http) {
        return {
            obterFolhaPorUsuario: function(usuarioLogado) {
                return $http.get('rest/folhas/usr/' + usuarioLogado._id);
            }
        }
    }
]);