'use strict';

angular.module('guiaGasto').controller('MovimentoStandaloneCtrl', [
    '$scope',
    '$http',
    '$mdDialog',
    '$mdMedia',
    'MovimentoService',
    function($scope, $http, $mdDialog, $mdMedia, MovimentoService) {
        $scope.fields = {
            codigoFolha: $scope.usuarioLogado.folhaSelecionada._id
        };

        var ctrl = function($scope, fields) {
            $scope.fields = fields;

            $scope.fechar = function() {
                $mdDialog.hide();
            };

            $scope.salvar = function(dto) {
                $scope.form.$setSubmitted();
                $http.post('rest/movimentos', dto).then(function(obj) {
                    $scope.$emit('atualizar-saldo');
                    $scope.fechar();
                    $scope.$emit('toast', 'Registro cadastrado com sucesso!');
                }).catch(function(err) {
                    console.log(err);
                });
            };
        };

        $scope.abrirModal = function(ev, tipo) {
            $scope.fields.tipo = tipo;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            ev.stopImmediatePropagation();
            $mdDialog.show({
                controller: ctrl,
                templateUrl: 'app/modules/movimento/movimento.modal.html',
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    fields: $scope.fields
                }
            });
        }
    }
]);