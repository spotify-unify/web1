'use strict';

class MainCtrl {

  constructor ($scope, Spotify, EchonestService) {

    EchonestService.getPlaylistSongs('stockholm').then(function (songsIds) {
      var url = "https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:";
      $scope.playlist = url + songsIds.join(',');
      Spotify.getTracks(songsIds.join(',')).then(function (data) {
        $scope.tracks = data.tracks;
        for (var i = 0; i < $scope.tracks.length; i++) {
          $scope.tracks[i].embeddlink = 'https://embed.spotify.com/?uri=' + $scope.tracks[i].uri;
        }
      });
    });
  }
}

MainCtrl.$inject = ['$scope', 'Spotify', 'EchonestService'];

export default MainCtrl;
