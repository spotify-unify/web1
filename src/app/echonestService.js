'use strict';

class EchonestService {
  constructor(Echonest, Spotify, $q) {
    this.Echonest = Echonest;
    this.q = $q;
    this.Spotify = Spotify;
  }
  
  songByArtist(artist_id) {
    return this.Echonest.songs.search({
      'artist_id': artist_id,
      'results': 1,
      'sort': 'song_hotttnesss-desc',
      'bucket': ['tracks', 'id:spotify']
    });
  }

  artistsByLocation(loc, number) {
    return this.Echonest.artists.search({
      artist_location: loc,
      results: number,
      bucket: 'id:spotify'
    });
  }

  getPlaylistSongs(loc) {
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
}

EchonestService.$inject = ['Echonest', 'Spotify', '$q'];

export default EchonestService;
