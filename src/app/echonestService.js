'use strict';

class EchonestService {
  constructor(Echonest, Spotify, $q, $http) {
    this.Echonest = Echonest;
    this.q = $q;
    this.http = $http;
    this.Spotify = Spotify;
  }

  artistsByLocation(loc, number) {
    return this.Echonest.artists.search({
      artist_location: loc,
      results: number,
      bucket: 'id:spotify'
    });
  }

  getPlaylistLocalSongs(loc) {
    var self = this;
    var artists = self.artistsByLocation(loc, 15);
    return artists.then(function(artists) {
      var artistIds = artists.map(function(artist) {
        return artist.foreign_ids[0].foreign_id;
      });
      return self.q.all(artistIds.map(function(id) {
        return self.Spotify.getArtistTopTracks(id.replace('spotify:artist:', ''), 'SE');
      })).then(function(songs) {
        return songs.map(function(song) {
          return song.tracks[0].id;
        });
      });
    });
  }

  getCountry(loc) {
    var self = this;
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + loc;
    return this.http.get(url).then(function(data) {
      var country = data.data.results[0].address_components.filter(function(a) {
        return a.types[0] == 'country';
      })[0];
      return country.short_name;
    });
  }

  getPlaylistPopularSongs(loc) {
    var self = this;
    return this.getCountry(loc).then(function(countryCode) {
      var url = 'http://charts.spotify.com/api/tracks/most_streamed/' + 
                 countryCode + '/daily/latest?callback=JSON_CALLBACK';
      return self.http.jsonp(url).then(function(songs) {
        return songs.data.tracks.slice(0, 15).map(function(song) {
          return song.track_url.replace('https://play.spotify.com/track/', '');
        });
      });
    });
  }
}

EchonestService.$inject = ['Echonest', 'Spotify', '$q', '$http'];

export default EchonestService;
