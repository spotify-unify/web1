'use strict';

class MainCtrl {

  constructor ($scope, Spotify, EchonestService) {

  
    $scope.artists = EchonestService.artistsByLocation('stockholm').then(function (data) {
      console.log(data);

      Spotify.getTracks('0eGsygTp906u18L0Oimnem,1lDWb6b6ieDQ2xT7ewTC3G').then(function (data) {
      $scope.tracks = data.tracks;
      $scope.playlist = "https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:"+"5Z7ygHQo02SUrFmcgpwsKW,1x6ACsKV4UdWS2FMuPFUiT,4bi73jCM02fMpkI11Lqmfe";
      });
    });
  }
}

MainCtrl.$inject = ['$scope', 'Spotify', 'EchonestService'];

export default MainCtrl;
