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

    $stateProvider.state('senhaTemporaria', {
        url: '/senha-temporaria',
        templateUrl: 'app/modules/login/senha-temporaria.view.html',
        controller: 'SenhaTemporariaCtrl'
    });

    $stateProvider.state('base.inicio', {
        url: 'inicio',
        templateUrl: 'app/modules/base/inicio.view.html',
        controller: 'MovimentoStandaloneCtrl'
    });

    $stateProvider.state('base.movimento', {
        url: 'movimento',
        templateUrl: 'app/modules/movimento/movimento.view.html',
        controller: 'MovimentoCtrl'
    });

    $stateProvider.state('base.folha', {
        url: 'folha',
        templateUrl: 'app/modules/folha/folha.view.html',
        controller: 'FolhaCtrl'
    });

    $stateProvider.state('base.extrato', {
        url: 'extrato',
        templateUrl: 'app/modules/extrato/extrato.view.html',
        controller: 'ExtratoCtrl'
    });

});