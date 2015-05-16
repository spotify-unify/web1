'use strict';

class MainCtrl {

  constructor ($scope, Spotify, EchonestService) {

  
    $scope.artists = EchonestService.artistsByLocation('stockholm').then(function (data) {
      console.log(data);

      Spotify.getTracks('0eGsygTp906u18L0Oimnem,1lDWb6b6ieDQ2xT7ewTC3G').then(function (data) {
      $scope.tracks = data.tracks;
      });
    });
  }
}



MainCtrl.$inject = ['$scope', 'Spotify', 'EchonestService'];

export default MainCtrl;
