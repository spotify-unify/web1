'use strict';

class MainCtrl {
  constructor ($scope, Spotify) {

    Spotify.getTracks('0eGsygTp906u18L0Oimnem,1lDWb6b6ieDQ2xT7ewTC3G').then(function (data) {
     $scope.tracks = data.tracks;
     console.log($scope.tracks[0].name);
    });
  }
}
MainCtrl.$inject = ['$scope', 'Spotify'];

export default MainCtrl;
