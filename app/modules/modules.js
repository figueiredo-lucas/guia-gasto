'use strict'

angular.module('guiaGasto').config(function($stateProvider) {

    $stateProvider.state('base', {
        url: '/',
        templateUrl: 'app/modules/base/menu.view.html',
        controller: 'MenuCtrl'
    });

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'app/modules/login/login.view.html',
        controller: 'LoginCtrl'
    });

    $stateProvider.state('base.movimento', {
        url: 'movimento',
        templateUrl: 'app/modules/movimento/movimento.view.html',
        controller: 'MovimentoCtrl'
    });

});