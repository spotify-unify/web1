'use strict';

class PlaylistCtrl {

  constructor ($scope, $stateParams, Spotify, EchonestService) {
    this.Spotify = Spotify;
    this.location = $stateParams.location;
    this.location = this.location.charAt(0).toUpperCase() + this.location.slice(1);
    $scope.location = this.location;

    EchonestService.getPlaylistSongs($stateParams.location).then(function (songsIds) {
      Spotify.getTracks(songsIds).then(function (data) {
        $scope.tracks = data.tracks;
        for (var i = 0; i < $scope.tracks.length; i++) {
          $scope.tracks[i].embeddlink = 'https://embed.spotify.com/?uri=' + $scope.tracks[i].uri;
        }
      });
    });

    $scope.createPlaylist = function() { 
      Spotify.login().then(function(data) {
        Spotify.getCurrentUser().then(function(user) {
          var options = {name: 'Unify - ' + $scope.location }
          Spotify.createPlaylist(user.id, options).then(function(p) {
            var tracks = $scope.tracks.map(function(track) {
              return track.uri;
            });
            Spotify.addPlaylistTracks(user.id, p.id, tracks).then(function(data) {
              alert("Success!");
            }); 
          });
        });
      });
    };
  }
}

PlaylistCtrl.$inject = ['$scope', '$stateParams', 'Spotify', 'EchonestService'];

export default PlaylistCtrl;
