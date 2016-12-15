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

                var properties = {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                };

                var edicao = $rootScope.$on('editar', function(ev, mouseEvent, dto) {
                    ev.stopPropagation();
                    if (angular.isDefined(attrs.preExecute)) {
                        scope.preExecute()(dto, scope);
                    }
                    scope.abrirModal(mouseEvent, dto);
                });

                var getFormData = function(dto) {
                    var formData = new FormData();
                    for (var prop in dto) {
                        if (dto[prop] instanceof Blob) {
                            formData.append("file", dto[prop]);
                        } else {
                            formData.append(prop, dto[prop]);
                        }
                    }
                    return formData;
                };

                var existeFileField = function(dto) {
                    var propertyName = undefined;
                    for (var prop in dto) {
                        if (dto[prop] instanceof Blob) {
                            propertyName = prop;
                        }
                    }
                    return propertyName;
                };

                scope.$on('$destroy', edicao);

                var ctrl = function($scope, $mdDialog, list, dtoEdit, fields, endpoint) {
                    $scope.editar = false;
                    $scope.fields = fields;

                    var save = function(dto) {
                        var formData = getFormData(dto);
                        $http.post(endpoint, formData, properties).then(function(obj) {
                            list.push(obj.data);
                            $scope.$emit('toast', 'Registro cadastrado com sucesso!');
                        });
                    };

                    var update = function(dto) {
                        angular.extend(dtoEdit, dto);
                        var formData = getFormData(dtoEdit);
                        $http.put(endpoint + '/' + dtoEdit._id, formData, properties).then(function() {
                            $scope.$emit('toast', 'Registro atualizado com sucesso!');
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
                            var propertyName = existeFileField(dto);
                            if (propertyName) {
                                dto[propertyName] = pDto[propertyName];
                            }
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
                    console.log('media sm:' + $mdMedia('sm'));
                    console.log('media xs:' + $mdMedia('xs'));
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