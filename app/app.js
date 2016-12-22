'use strict';

angular.module('guiaGasto', [

    'ngMessages',
    'ngAnimate',
    'ngAria',
    'ngMaterial',
    'ngCookies',
    'ui.router',
    'ui.utils.masks',
    'lfPersistence',
]).config(function($mdIconProvider) {
    $mdIconProvider
        .iconSet('action', '../assets/iconsets/action-icons.svg', 24)
        .iconSet('alert', '../assets/iconsets/alert-icons.svg', 24)
        .iconSet('av', '../assets/iconsets/av-icons.svg', 24)
        .iconSet('communication', '../assets/iconsets/communication-icons.svg', 24)
        .iconSet('content', '../assets/iconsets/content-icons.svg', 24)
        .iconSet('device', '../assets/iconsets/device-icons.svg', 24)
        .iconSet('editor', '../assets/iconsets/editor-icons.svg', 24)
        .iconSet('file', '../assets/iconsets/file-icons.svg', 24)
        .iconSet('hardware', '../assets/iconsets/hardware-icons.svg', 24)
        .iconSet('icons', '../assets/iconsets/mdi-icons.svg', 24)
        .iconSet('image', '../assets/iconsets/image-icons.svg', 24)
        .iconSet('maps', '../assets/iconsets/maps-icons.svg', 24)
        .iconSet('navigation', '../assets/iconsets/navigation-icons.svg', 24)
        .iconSet('notification', '../assets/iconsets/notification-icons.svg', 24)
        .iconSet('social', '../assets/iconsets/social-icons.svg', 24)
        .iconSet('toggle', '../assets/iconsets/toggle-icons.svg', 24)
        .iconSet('avatar', '../assets/iconsets/avatar-icons.svg', 128);
}).config(function($urlRouterProvider, $locationProvider, $mdThemingProvider, $mdDateLocaleProvider) {
    $mdThemingProvider.theme("error-toast");

    $mdThemingProvider.theme('default')
        .primaryPalette('light-blue')
        .accentPalette('blue');
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('DD/MM/YYYY');
    };

    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD/MM/YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };

}).run(function($rootScope, $mdToast, $cookieStore) {

    $rootScope.usuarioLogado = $cookieStore.get('usuario');
    console.log($cookieStore.get('usuario'));

    $rootScope.$on('toast', function(ev, texto, erro) {
        if (erro) {
            var ctrl = function($scope, msg) {
                $scope.msg = msg;
            };
            $mdToast.show({
                controller: ctrl,
                template: '<md-toast class="error-toast">{{msg}}</md-toast>',
                hideDelay: 5000,
                position: "top right",
                locals: {
                    msg: texto
                }
            });
        } else {
            $mdToast.show($mdToast.simple()
                .textContent(texto)
                .position("top right")
                .hideDelay(3000));
        }
    });
});