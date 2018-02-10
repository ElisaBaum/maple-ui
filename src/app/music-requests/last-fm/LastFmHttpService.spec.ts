import {Container} from "inversify";
import {
  ArtistResults, LastFmHttpService, MIN_LISTENERS_COUNT, MAX_SEARCH_RESULT_COUNT,
  AlbumResults, SongResults
} from "./LastFmHttpService";
import {Http} from "../../http/Http";
import {LastFmArtist} from "./LastFmArtist";
import {expect} from "chai";
import {LastFmAlbum} from "./LastFmAlbum";
import {LastFmSong} from "./LastFmSong";

describe('LastFmHttpService', () => {

  const container = new Container();
  container.bind(LastFmHttpService).toSelf();

  describe('searchArtists', () => {

    it(`should return all artists that fulfil the filter criteria but not more than ${MAX_SEARCH_RESULT_COUNT}`, async () => {
      const artists = Array(MAX_SEARCH_RESULT_COUNT + 1).fill(mockArtist({}));
      container.bind(Http).toConstantValue(createHttpGetMock(createArtistResults(artists)));

      const service = container.get(LastFmHttpService);
      const response = await service.searchArtists('artist', () => null);

      expect(response.length).to.eql(MAX_SEARCH_RESULT_COUNT);

      response.forEach(artist =>
        expect(artist).to.eql(mockArtist({})
        )
      );
    });

    it(`should filter all artists with less than ${MIN_LISTENERS_COUNT} listeners`, async () => {
      const artists = [ mockArtist({listeners: `${MIN_LISTENERS_COUNT - 1}`})];
      container.unbind(Http);
      container.bind(Http).toConstantValue(createHttpGetMock(createArtistResults(artists)));

      const service = container.get(LastFmHttpService);
      const response = await service.searchArtists('artist', () => null);

      expect(response.length).to.eql(0);
    });

    it(`should filter all artists with names that include invalid parts`, async () => {
      const artists = [
        mockArtist({name: 'Emarosa feat. Jonny Craig'}),
        mockArtist({name: 'Emarosa featuring Jonny Craig'}),
        mockArtist({name: 'Emarosa www.emarosa.com'})
      ];
      container.unbind(Http);
      container.bind(Http).toConstantValue(createHttpGetMock(createArtistResults(artists)));

      const service = container.get(LastFmHttpService);
      const response = await service.searchArtists('artist',  () => null);

      expect(response.length).to.eql(0);
    });

    it(`should filter all artists without musicbrainz id or images`, async () => {
      const artists = [mockArtist({
        mbid: '',
        image: [
          {'#text': '', 'size': ''}
        ]
      })];
      container.unbind(Http);
      container.bind(Http).toConstantValue(createHttpGetMock(createArtistResults(artists)));

      const service = container.get(LastFmHttpService);
      const response = await service.searchArtists('artist', () => null);

      expect(response.length).to.eql(0);
    });

    function createArtistResults(artists: LastFmArtist[]): ArtistResults {
      return {
        results: {
          artistmatches: {
            artist: artists
          }
        }
      };
    }

    function mockArtist(artist: Partial<LastFmArtist>) {
      return {
        name: 'Emarosa',
        url: 'www.url.com',
        listeners: '20',
        mbid: 'id',
        image: [
          {'#text': 'imageUrl', 'size': ''}
        ],
        ...artist
      };
    }
  });

  describe('searchAlbums', () => {

    it(`should return all albums that fulfil the filter criteria but not more than ${MAX_SEARCH_RESULT_COUNT}`, async () => {
      const albums = Array(MAX_SEARCH_RESULT_COUNT + 1).fill(mockAlbum({}));
      container.unbind(Http);
      container.bind(Http).toConstantValue(createHttpGetMock(createAlbumResults(albums)));

      const service = container.get(LastFmHttpService);
      const response = await service.searchAlbums('album', () => null);

      expect(response.length).to.eql(MAX_SEARCH_RESULT_COUNT);

      response.forEach(artist =>
        expect(artist).to.eql(mockAlbum({})
        )
      );
    });

    it(`should filter all albums without musicbrainz id or images`, async () => {
      const albums = [mockAlbum({
        mbid: '',
        image: [
          {'#text': '', 'size': ''}
        ]
      })];
      container.unbind(Http);
      container.bind(Http).toConstantValue(createHttpGetMock(createAlbumResults(albums)));

      const service = container.get(LastFmHttpService);
      const response = await service.searchAlbums('album', () => null);

      expect(response.length).to.eql(0);
    });

    function createAlbumResults(albums: LastFmAlbum[]): AlbumResults {
      return {
        results: {
          albummatches: {
            album: albums
          }
        }
      };
    }

    function mockAlbum(album: Partial<LastFmAlbum>) {
      return {
        name: 'Emarosa',
        artist: 'Emarosa',
        url: 'www.url.com',
        mbid: 'id',
        image: [
          {'#text': 'imageUrl', 'size': ''}
        ],
        ...album
      };
    }
  });

  describe('searchSongs', () => {

    it(`should return all songs that fulfil the filter criteria but not more than ${MAX_SEARCH_RESULT_COUNT}`, async () => {
      const songs = Array(MAX_SEARCH_RESULT_COUNT + 1).fill(mockSong({}));
      container.unbind(Http);
      container.bind(Http).toConstantValue(createHttpGetMock(createSongResults(songs)));

      const service = container.get(LastFmHttpService);
      const response = await service.searchSongs('song', () => null);

      expect(response.length).to.eql(MAX_SEARCH_RESULT_COUNT);

      response.forEach(artist =>
        expect(artist).to.eql(mockSong({})
        )
      );
    });

    it(`should filter all songs with less than ${MIN_LISTENERS_COUNT} listeners`, async () => {
      const songs = [ mockSong({listeners: `${MIN_LISTENERS_COUNT - 1}`})];
      container.unbind(Http);
      container.bind(Http).toConstantValue(createHttpGetMock(createSongResults(songs)));

      const service = container.get(LastFmHttpService);
      const response = await service.searchSongs('song', () => null);

      expect(response.length).to.eql(0);
    });

    it(`should filter all songs with names that include invalid parts`, async () => {
      const songs = [
        mockSong({name: 'We Are Life www.emarosa.com'}),
        mockSong({name: 'We Are Life Emarosa', artist: 'Emarosa'})
      ];
      container.unbind(Http);
      container.bind(Http).toConstantValue(createHttpGetMock(createSongResults(songs)));

      const service = container.get(LastFmHttpService);
      const response = await service.searchSongs('song', () => null);

      expect(response.length).to.eql(0);
    });

    it(`should filter all songs with unknown artist`, async () => {
      const songs = [mockSong({name: 'We Are Life', artist: '[unknown]'})];
      container.unbind(Http);
      container.bind(Http).toConstantValue(createHttpGetMock(createSongResults(songs)));

      const service = container.get(LastFmHttpService);
      const response = await service.searchSongs('song', () => null);

      expect(response.length).to.eql(0);
    });

    function createSongResults(songs: LastFmSong[]): SongResults {
      return {
        results: {
          trackmatches: {
            track: songs
          }
        }
      };
    }

    function mockSong(song: Partial<LastFmSong>) {
      return {
        name: 'A Toast to the Future Kids!',
        artist: 'Emarosa',
        url: 'www.url.com',
        listeners: '20',
        ...song
      };
    }
  });

  describe('getArtistInfo', () => {

    it(`should return artistInfo for given artist name`, async () => {
      const artistInfo = {
        artist: {
          name: 'artistName'
        }
      };
      container.unbind(Http);
      container.bind(Http).toConstantValue(createHttpGetMock(artistInfo));

      const service = container.get(LastFmHttpService);
      const response = await service.getArtistInfo('artistName');

      expect(response).to.eql(artistInfo);
    });

  });

  function createHttpGetMock(data) {
    return {
      get() {
        return Promise.resolve({data});
      }
    } as any;
  }

});
