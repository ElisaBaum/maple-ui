import {Container} from "inversify";
import {
  ArtistResults, LastFmHttpService, MIN_LISTENERS_COUNT, MAX_SEARCH_RESULT_COUNT,
  AlbumResults, SongResults
} from "./LastFmHttpService";
import {Http} from "../http/Http";
import {Artist} from "./Artist";
import {expect} from "chai";
import {Album} from "./Album";
import {Song} from "./Song";

describe('LastFmHttpService', () => {

  const container = new Container();
  container.bind(LastFmHttpService).toSelf();

  describe('searchArtists', () => {

    it(`should return all artists that fulfil the filter criteria but not more than ${MAX_SEARCH_RESULT_COUNT}`, async () => {
      const artists = Array(MAX_SEARCH_RESULT_COUNT + 1).fill(mockArtist({}));
      container.bind(Http).toConstantValue(createHttpGetMock(createArtistResults(artists)));

      const service = container.get(LastFmHttpService);
      const response = await service.searchArtists('artist', 'apiKey', () => null);

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
      const response = await service.searchArtists('artist', 'apiKey', () => null);

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
      const response = await service.searchArtists('artist', 'apiKey', () => null);

      expect(response.length).to.eql(0);
    });

    it(`should filter all artists without musicbrainz id or images`, async () => {
      const artists = [mockArtist({
        mbid: '',
        image: [
          {'#text': ''}
        ]
      })];
      container.unbind(Http);
      container.bind(Http).toConstantValue(createHttpGetMock(createArtistResults(artists)));

      const service = container.get(LastFmHttpService);
      const response = await service.searchArtists('artist', 'apiKey', () => null);

      expect(response.length).to.eql(0);
    });

    function createArtistResults(artists: Artist[]): ArtistResults {
      return {
        results: {
          artistmatches: {
            artist: artists
          }
        }
      };
    }

    function mockArtist(artist: Partial<Artist>) {
      return {
        name: 'Emarosa',
        url: 'www.url.com',
        listeners: '20',
        mbid: 'id',
        image: [
          {'#text': 'imageUrl'}
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
      const response = await service.searchAlbums('album', 'apiKey', () => null);

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
          {'#text': ''}
        ]
      })];
      container.unbind(Http);
      container.bind(Http).toConstantValue(createHttpGetMock(createAlbumResults(albums)));

      const service = container.get(LastFmHttpService);
      const response = await service.searchAlbums('album', 'apiKey', () => null);

      expect(response.length).to.eql(0);
    });

    function createAlbumResults(albums: Album[]): AlbumResults {
      return {
        results: {
          albummatches: {
            album: albums
          }
        }
      };
    }

    function mockAlbum(album: Partial<Album>) {
      return {
        name: 'Emarosa',
        artist: 'Emarosa',
        url: 'www.url.com',
        mbid: 'id',
        image: [
          {'#text': 'imageUrl'}
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
      const response = await service.searchSongs('song', 'apiKey', () => null);

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
      const response = await service.searchSongs('song', 'apiKey', () => null);

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
      const response = await service.searchSongs('song', 'apiKey', () => null);

      expect(response.length).to.eql(0);
    });

    it(`should filter all songs with unknown artist`, async () => {
      const songs = [mockSong({name: 'We Are Life', artist: '[unknown]'})];
      container.unbind(Http);
      container.bind(Http).toConstantValue(createHttpGetMock(createSongResults(songs)));

      const service = container.get(LastFmHttpService);
      const response = await service.searchSongs('song', 'apiKey', () => null);

      expect(response.length).to.eql(0);
    });

    function createSongResults(songs: Song[]): SongResults {
      return {
        results: {
          trackmatches: {
            track: songs
          }
        }
      };
    }

    function mockSong(song: Partial<Song>) {
      return {
        name: 'A Toast to the Future Kids!',
        artist: 'Emarosa',
        url: 'www.url.com',
        listeners: '20',
        ...song
      };
    }
  });

  function createHttpGetMock(data) {
    return {
      get() {
        return Promise.resolve({data});
      }
    } as any;
  }

});
