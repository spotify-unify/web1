'use strict';

class PlaylistCtrl {

  constructor ($scope, $stateParams, Spotify, EchonestService) {
    
    this.location = $stateParams.location;
    this.location = this.location.charAt(0).toUpperCase() + this.location.slice(1);
    $scope.location = this.location;

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

  createPlaylist() {
    
  }
}

PlaylistCtrl.$inject = ['$scope', '$stateParams', 'Spotify', 'EchonestService'];

export default PlaylistCtrl;
