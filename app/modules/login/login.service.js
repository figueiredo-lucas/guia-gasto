angular.module('guiaGasto').factory('LoginService', [
    '$cookieStore',
    '$http',
    'FolhaService',
    function($cookieStore, $http, FolhaService) {
        return {
            acessar: function(usuario, success, error) {
                $http.post('rest/usuarios/login', usuario).then(function(response) {
                    var usuarioEncontrado = response.data;
                    FolhaService.obterFolhaPorUsuario(usuarioEncontrado).then(function(folhas) {
                        usuarioEncontrado.folhas = folhas.data;
                        if (usuarioEncontrado.folhas.length === 1) {
                            usuarioEncontrado.folhaSelecionada = usuarioEncontrado.folhas[0];
                        } else if (usuarioEncontrado.folhas.length > 1) {
                            usuarioEncontrado.folhaSelecionada = _.find(usuarioEncontrado.folhas, { folhaPadrao: true });
                        }
                        $cookieStore.put('usuario', usuarioEncontrado);
                        if (_.isFunction(success)) {
                            success(usuarioEncontrado);
                        }
                    }).catch(function(err) {
                        scope.$emit('toast', error.data, true);
                    });
                }, error);
            },
            usuarioLogado: function() {
                return $cookieStore.get('usuario');
            }
        }
    }
]);