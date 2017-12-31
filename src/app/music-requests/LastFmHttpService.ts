import {Inject, Injectable} from "react.di";
import {Http} from "../http/Http";
import axios from 'axios';
import {Artist} from "./Artist";
import {Song} from "./Song";
import {Album} from "./Album";
import {MusicServiceError} from "./MusicServiceError";

@Injectable
export class LastFmHttpService {

  private apiBaseUrl = 'http://ws.audioscrobbler.com/2.0/';

  private maxApiResultCount = 40;
  private minListenersCount = 10;
  private maxSearchResultCount = 5;

  private defaultRequestParams = {
    limit: this.maxApiResultCount,
    format: 'json'
  };

  constructor(@Inject private http: Http) {
  }

  async searchArtists(artistName: string, apiKey: string, onGetCancel) {
    const response = await this.doSearchRequest<ArtistResults>({
      ...this.defaultRequestParams,
      method: 'artist.search',
      artist: artistName,
      api_key: apiKey
    }, onGetCancel);

    const getNameFilterRegex = () => /\(|\)|feat\.|\sfeaturing\s|www\.(.+?)\./g;

    if (response) {
      return response.results.artistmatches.artist
        .filter((artist) =>
          artist.listeners as any > this.minListenersCount &&
          !getNameFilterRegex().test(artist.name) &&
          this.imageOrMBIDExists(artist)
        )
        .slice(0, this.maxSearchResultCount);
    }
    return [];

  }

  async searchSongs(songName: string, apiKey: string, onGetCancel, artistName?: string) {
    const response = await this.doSearchRequest<SongResults>({
      ...this.defaultRequestParams,
      method: 'track.search',
      track: songName,
      artist: artistName,
      api_key: apiKey
    }, onGetCancel);

    const getNameFilterRegex = () => /www\.(.+?)\./g;

    if (response) {
      return response.results.trackmatches.track
        .filter(({listeners, name, artist}) =>
          listeners as any > this.minListenersCount &&
          !getNameFilterRegex().test(name) &&
          artist.indexOf('[unknown]') === -1 &&
          name.indexOf(artist) === -1
        )
        .slice(0, this.maxSearchResultCount);
    }
    return [];
  }

  async searchAlbums(albumName: string, apiKey: string, onGetCancel, artistName?: string) {
    const response = await this.doSearchRequest<AlbumResults>({
      ...this.defaultRequestParams,
      method: 'album.search',
      album: albumName,
      artist: artistName,
      api_key: apiKey
    }, onGetCancel);

    if (response) {
      return response.results.albummatches.album
        .filter(this.imageOrMBIDExists)
        .slice(0, this.maxSearchResultCount);
    }
    return [];
  }

  private async doSearchRequest<T>(params, onGetCancel): Promise<T | undefined> {
    try {
      const response = await this.http.get<T>(this.apiBaseUrl, {
        params,
        interceptOptions: {skipAuth: true},
        cancelToken: new axios.CancelToken(onGetCancel)
      });
      return response.data;
    } catch (e) {
      if (e.response && e.response.data) {
        throw new MusicServiceError(e.response.data.error);
      }
      if (!e.__CANCEL__) {
        throw e;
      }
    }
  }

  private imageOrMBIDExists = ({mbid, image}) => !!mbid || image.some(img => !!img["#text"]);

}

interface ArtistResults {
  results: {
    artistmatches: {
      artist: Artist[]
    }
  };
}

interface SongResults {
  results: {
    trackmatches: {
      track: Song[]
    }
  };
}

interface AlbumResults {
  results: {
    albummatches: {
      album: Album[]
    }
  };
}



