'use strict';

import MainCtrl from './main/main.controller';
import NavbarCtrl from '../app/components/navbar/navbar.controller';

angular.module('methuselah', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'mgcrea.ngStrap', 'spotify'])
  .controller('MainCtrl', MainCtrl)
  .controller('NavbarCtrl', NavbarCtrl)

  .config(function ($stateProvider, $urlRouterProvider, SpotifyProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
      SpotifyProvider.setClientId('d74a81e92d4c401cac467f4818a31b82');
      SpotifyProvider.setRedirectUri('http://localhost:3000');
      SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
    $urlRouterProvider.otherwise('/');
  })
;
