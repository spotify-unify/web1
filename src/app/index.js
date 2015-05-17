'use strict';

import MainCtrl from './main/main.controller';
import PlaylistCtrl from './playlist/playlist.controller';
import EchonestService from '../app/echonestService';

angular.module('Not Internet Explorer', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'mgcrea.ngStrap', 'spotify', 'angular-echonest'])
  .service('EchonestService', EchonestService)
  .controller('MainCtrl', MainCtrl)
  .controller('PlaylistCtrl', PlaylistCtrl)

  .config(function ($stateProvider, $urlRouterProvider, SpotifyProvider, $sceDelegateProvider, EchonestProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('playlist', {
        url: '/playlist/:location',
        templateUrl: 'app/playlist/playlist.html',
        controller: 'PlaylistCtrl'
      });
      
      SpotifyProvider.setClientId('d74a81e92d4c401cac467f4818a31b82');
      SpotifyProvider.setRedirectUri('http://localhost:3000');
      SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
    $urlRouterProvider.otherwise('/');

    $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://embed.spotify.com/?uri=**',
    'https://p.scdn.co/mp3-preview/**'
  ]);
    EchonestProvider.setApiKey('3SDUZCDIIYZJBHE0A');

  });
