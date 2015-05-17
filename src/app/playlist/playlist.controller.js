'use strict';

class PlaylistCtrl {

  constructor ($scope, $stateParams, Spotify, EchonestService) {

    EchonestService.getPlaylistSongs($stateParams.location).then(function (songsIds) {
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

PlaylistCtrl.$inject = ['$scope', '$stateParams', 'Spotify', 'EchonestService'];

export default PlaylistCtrl;
