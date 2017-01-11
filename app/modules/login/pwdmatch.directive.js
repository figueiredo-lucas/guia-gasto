angular.module('guiaGasto').directive('pwdMatch', function() {
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
            var getScopeVariableValue = function() {
                var subValueScope = scope;
                if (attrs.pwdMatch.indexOf('.') > -1) {
                    var arrValues = attrs.pwdMatch.split('.');
                    for (var ind = 0; ind < arrValues.length; ind++) {
                        subValueScope = subValueScope[arrValues[ind]];
                    }
                } else {
                    subValueScope = scope[attrs.pwdMatch];
                }
                return subValueScope;
            };

            scope.$watch(attrs.pwdMatch, function(pwd) {
                if (pwd && elem.val() && elem.val().length > 0) {
                    // scope.$apply(function() {
                    var v = elem.val() === pwd;
                    ctrl.$setValidity('pwdmatch', v);
                    // });
                }
            });

            scope.$watch(attrs.ngModel, function(pwd) {
                if (pwd) {
                    // scope.$apply(function() {
                    var v = pwd === getScopeVariableValue();
                    ctrl.$setValidity('pwdmatch', v);
                    // });
                }
            });
        }
    }
});