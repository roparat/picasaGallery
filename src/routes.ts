/// <reference path="../typings/index.d.ts" />

export default routesConfig;

import {singleGallery} from './app/controllers/singlegallery';

/** @ngInject */
function routesConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider, $locationProvider: angular.ILocationProvider) {
  $locationProvider.html5Mode(false);
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app'
    })
    .state('singlegallery', singleGallery);
}
