'use strict';

angular.module('lfPersistence').directive('editRemove', [
    '$mdDialog',
    '$http',
    function($mdDialog, $http) {
        return {
            templateUrl: 'components/lf-persistence/edit-remove/edit-remove.html',
            restrict: 'E',
            scope: {
                dto: "=",
                list: "=",
                endpoint: "@"
            },
            link: function(scope, element, attrs) {

                scope.editar = function(ev, pDto) {
                    scope.$emit('editar', ev, pDto);
                };

                scope.remover = function(ev, pDto) {
                    ev.stopImmediatePropagation();
                    var confirm = $mdDialog.confirm()
                        .title('Deseja remover o registro?')
                        .textContent('Caso confirme, os dados serão removidos.')
                        .ariaLabel('Remover o registro')
                        .targetEvent(ev)
                        .ok('Sim')
                        .cancel('Não');
                    $mdDialog.show(confirm).then(function() {
                        remover(pDto);
                    });
                };

                var remover = function(pDto) {
                    $http.delete(scope.endpoint + '/' + pDto._id).then(function() {
                        _.remove(scope.list, function(val) {
                            return val._id === pDto._id;
                        });
                        scope.$emit('toast', 'Registro removido com sucesso!');
                    }, function(error) {
                        scope.$emit('toast', error.data, true);
                    });
                };

            }
        };
    }
]);