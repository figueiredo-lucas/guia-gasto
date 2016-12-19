'use strict';

angular.module('guiaGasto').controller('MenuCtrl', [
    '$scope',
    '$state',
    '$location',
    '$http',
    '$mdSidenav',
    '$cookieStore',
    '$mdDialog',
    '$mdMedia',
    function($scope, $state, $location, $http, $mdSidenav, $cookieStore, $mdDialog, $mdMedia) {

        //criar lógica para verificar se estou logado, se não, redirecionar para a tela de login (login)

        var usuarioLogado = $cookieStore.get('usuario');
        if (!usuarioLogado) {
            $state.go('login');
        }

        $scope.isActive = function(route) {
            return ('/' + route.replace('base.', '')) === $location.path();
        };

        $scope.toggleLeft = function() {
            $mdSidenav('left').toggle();
        };

        $scope.logoff = function() {
            $cookieStore.remove('usuario');
            $state.go('login');
        }

        var SelecionarFolhaCtrl = function($scope, $cookieStore) {

            var usuarioLogado = $scope.$root.usuarioLogado;

            $scope.folhas = usuarioLogado.folhas;

            $scope.fechar = function() {
                $mdDialog.hide();
            }

            $scope.folhaSelecionada = usuarioLogado.folhaSelecionada ? usuarioLogado.folhaSelecionada._id : undefined;

            $scope.$watch('folhaSelecionada', function(folhaSelecionada, folhaSelecionadaAnterior) {
                if (folhaSelecionada !== folhaSelecionadaAnterior) {
                    usuarioLogado.folhaSelecionada = _.find($scope.folhas, { _id: folhaSelecionada });
                    $cookieStore.put('usuario', usuarioLogado);
                    $scope.fechar();
                }
            });
        };

        $scope.selecionarFolha = function(ev) {
            $mdDialog.show({
                controller: SelecionarFolhaCtrl,
                templateUrl: 'app/modules/folha/selecionar-folha.modal.html',
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: false
            });
        };
    }
]);