'use strict';

class EchonestService {
    constructor(Echonest) {
        this.Echonest = Echonest;
    }
    
    songByArtist(artist_id) {
        return this.Echonest.songs.search({
            'artist_id': artist_id,
            'results': 1,
            'bucket': ['tracks', 'id:spotify']
        });
    }

    artistsByLocation(loc) {
        return this.Echonest.artists.search({
            artist_location: loc,
            results: 15,
            bucket: 'id:spotify'
        });
    }
}

EchonestService.$inject = ['Echonest'];

export default EchonestService;
