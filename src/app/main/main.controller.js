'use strict';

class MainCtrl {

  constructor ($scope, Spotify, EchonestService) {

    Spotify.getTracks('0eGsygTp906u18L0Oimnem,1lDWb6b6ieDQ2xT7ewTC3G').then(function (data) {
     $scope.tracks = data.tracks;
     for(var i = 0; i < $scope.tracks.length; i++)

      {
        $scope.tracks[i].embeddlink = 'https://embed.spotify.com/?uri=' + $scope.tracks[i].uri;
      } 
     console.log($scope.tracks[0]);
    });

    $scope.artists = EchonestService.artistsByLocation('stockholm');
  }
}

MainCtrl.$inject = ['$scope', 'Spotify', 'EchonestService'];

export default MainCtrl;
