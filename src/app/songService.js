'use strict';

class SongService {
  constructor(Echonest, Spotify, $q, $http) {
    this.Echonest = Echonest;
    this.q = $q;
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
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + loc;
    return $http.get(url).success(function(data, _, _, _) {
      var country = data.results[0].address_components.filter(function(a) {
        return a.types[0] == 'country';
      })[0];
      return country.short_name;
    });
  }

  getPlaylistPopularSongs(loc) {
    getCountry(loc).then(function(country) {
      console.log(country);
    });
  }
}

SongService.$inject = ['Echonest', 'Spotify', '$q', '$http'];

export default SongService;
