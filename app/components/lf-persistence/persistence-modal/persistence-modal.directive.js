'use strict';

angular.module('lfPersistence').directive('persistenceModal', [
    '$rootScope',
    '$mdDialog',
    '$mdMedia',
    '$http',
    function($rootScope, $mdDialog, $mdMedia, $http) {
        return {
            templateUrl: 'components/lf-persistence/persistence-modal/persistence-modal.html',
            restrict: 'E',
            scope: {
                templateUrl: "@",
                list: "=",
                fields: "=",
                endpoint: "@",
                preExecute: "&"
            },
            link: function(scope, element, attrs) {

                var edicao = $rootScope.$on('editar', function(ev, mouseEvent, dto) {
                    ev.stopPropagation();
                    if (angular.isDefined(attrs.preExecute)) {
                        scope.preExecute()(dto, scope);
                    }
                    scope.abrirModal(mouseEvent, dto);
                });

                scope.$on('$destroy', edicao);

                var ctrl = function($scope, $mdDialog, list, dtoEdit, fields, endpoint) {
                    $scope.editar = false;
                    $scope.fields = fields;

                    var save = function(dto) {
                        $http.post(endpoint, dto).then(function(obj) {
                            list.push(obj.data);
                            $scope.$emit('toast', 'Registro cadastrado com sucesso!');
                        }).catch(function(err) {
                            console.log(err);
                        });
                    };

                    var update = function(dto) {
                        angular.extend(dtoEdit, dto);
                        $http.put(endpoint + '/' + dtoEdit._id, dtoEdit).then(function() {
                            $scope.$emit('toast', 'Registro atualizado com sucesso!');
                        }).catch(function(err) {
                            console.log(err);
                        });
                    };

                    if (dtoEdit) {
                        $scope.dto = angular.copy(dtoEdit);
                        $scope.editar = true;
                    }

                    $scope.fechar = function() {
                        $mdDialog.hide();
                    };

                    $scope.salvar = function(pDto) {
                        $scope.form.$setSubmitted();
                        if ($scope.form.$valid) {
                            var dto = angular.copy(pDto);
                            if (dtoEdit) {
                                update(dto);
                            } else {
                                save(dto);
                            }
                            $scope.fechar();
                        }
                    };
                };

                scope.abrirModal = function(ev, pDto) {
                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
                    ev.stopImmediatePropagation();
                    $mdDialog.show({
                        controller: ctrl,
                        templateUrl: scope.templateUrl,
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: useFullScreen,
                        locals: {
                            list: scope.list,
                            dtoEdit: pDto,
                            fields: scope.fields,
                            endpoint: scope.endpoint
                        }
                    });
                };
            }
        };
    }
]);