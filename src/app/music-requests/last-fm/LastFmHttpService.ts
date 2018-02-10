import {Inject, Injectable} from "react.di";
import {Http} from "../../http/Http";
import axios from 'axios';
import {LastFmArtist} from "./LastFmArtist";
import {LastFmSong} from "./LastFmSong";
import {LastFmAlbum} from "./LastFmAlbum";
import {LastFmMusicServiceError} from "./LastFmMusicServiceError";

export const MIN_LISTENERS_COUNT = 10;
export const MAX_SEARCH_RESULT_COUNT = 3;
const API_KEY = process.env.LAST_FM_API_KEY;
const API_URL = process.env.LAST_FM_API_URL;

@Injectable
export class LastFmHttpService {

  private maxApiResultCount = 40;
  private minListenersCount = MIN_LISTENERS_COUNT;
  private maxSearchResultCount = MAX_SEARCH_RESULT_COUNT;

  private defaultRequestParams = {
    limit: this.maxApiResultCount,
    format: 'json'
  };

  constructor(@Inject private http: Http) {
  }

  async searchArtists(artistName: string, onGetCancel) {
    const response = await this.doLastFmApiRequest<ArtistResults>({
      ...this.defaultRequestParams,
      method: 'artist.search',
      artist: artistName,
      api_key: API_KEY
    }, onGetCancel);

    const getNameFilterRegex = () => /\(|\)|feat\.|\sfeaturing\s|www\.(.+?)\./g;

    return response.results.artistmatches.artist
      .filter((artist) =>
        artist.listeners as any > this.minListenersCount &&
        !getNameFilterRegex().test(artist.name) &&
        this.imageOrMBIDExists(artist)
      )
      .slice(0, this.maxSearchResultCount);
  }

  async searchSongs(songName: string, onGetCancel, artistName?: string) {
    const response = await this.doLastFmApiRequest<SongResults>({
      ...this.defaultRequestParams,
      method: 'track.search',
      track: songName,
      artist: artistName,
      api_key: API_KEY
    }, onGetCancel);

    const getNameFilterRegex = () => /www\.(.+?)\./g;

    return response.results.trackmatches.track
      .filter(({listeners, name, artist}) =>
        listeners as any > this.minListenersCount &&
        !getNameFilterRegex().test(name) &&
        artist.indexOf('[unknown]') === -1 &&
        name.indexOf(artist) === -1
      )
      .slice(0, this.maxSearchResultCount);
  }

  async searchAlbums(albumName: string, onGetCancel, artistName?: string) {
    const response = await this.doLastFmApiRequest<AlbumResults>({
      ...this.defaultRequestParams,
      method: 'album.search',
      album: albumName,
      artist: artistName,
      api_key: API_KEY
    }, onGetCancel);

    return response.results.albummatches.album
      .filter(this.imageOrMBIDExists)
      .slice(0, this.maxSearchResultCount);
  }

  getArtistInfo(artistName: string) {
    return this.doLastFmApiRequest<LastFmArtistInfo>({
      ...this.defaultRequestParams,
      method: 'artist.getinfo',
      artist: artistName,
      api_key: API_KEY
    });
  }

  private async doLastFmApiRequest<T>(params, onGetCancel?): Promise<T> {
    try {
      const response = await this.http.get<T>(API_URL, {
        params,
        interceptOptions: {skipAuth: true},
        cancelToken: onGetCancel && new axios.CancelToken(onGetCancel)
      });
      return response.data;
    } catch (e) {
      if (e.response && e.response.data && e.response.data.error) {
        throw new LastFmMusicServiceError(e.response.data.error);
      } else {
        throw e;
      }
    }
  }

  private imageOrMBIDExists = ({mbid, image}) => !!mbid || image.some(img => !!img["#text"]);

}

export interface ArtistResults {
  results: {
    artistmatches: {
      artist: LastFmArtist[]
    }
  };
}

export interface SongResults {
  results: {
    trackmatches: {
      track: LastFmSong[]
    }
  };
}

export interface AlbumResults {
  results: {
    albummatches: {
      album: LastFmAlbum[]
    }
  };
}

export interface LastFmArtistInfo {
  artist: LastFmArtist;
}



