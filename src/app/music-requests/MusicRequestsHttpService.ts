import {Http} from '../http/Http';
import {Inject, Injectable} from 'react.di';
import {RequestedArtist} from "./RequestedArtist";
import {RequestedAlbum} from "./RequestedAlbum";
import {RequestedSong} from "./RequestedSong";
import {RecursivePartial} from "../common/RecursivePartial";

@Injectable
export class MusicRequestsHttpService {

  constructor(@Inject private http: Http) {
  }

  async getRequestedArtists() {
    const requestedArtists = await this.http.get<RequestedArtist[]>('/users/me/music-request-artists');
    return requestedArtists.data;
  }

  async addRequestedArtist(artist: Partial<RequestedArtist>) {
    const requestedArtist = await this.http.post<RequestedArtist>('/users/me/music-request-artists', artist);
    return requestedArtist.data;
  }

  deleteRequestedArtist(artistId: number) {
    return this.http.delete(`/users/me/music-request-artists/${artistId}`);
  }

  async getRequestedAlbums() {
    const requestedAlbums = await this.http.get<RequestedAlbum[]>('/users/me/music-request-albums');
    return requestedAlbums.data;
  }

  async addRequestedAlbum(album: RecursivePartial<RequestedAlbum>) {
    const requestedAlbum = await this.http.post<RequestedAlbum>('/users/me/music-request-albums', album);
    return requestedAlbum.data;
  }

  deleteRequestedAlbum(albumId: number) {
    return this.http.delete(`/users/me/music-request-albums/${albumId}`);
  }

  async getRequestedSongs() {
    const requestedSongs = await this.http.get<RequestedSong[]>('/users/me/music-request-songs');
    return requestedSongs.data;
  }

  async addRequestedSong(song: RecursivePartial<RequestedSong>) {
    const requestedSong = await this.http.post<RequestedSong>('/users/me/music-request-songs', song);
    return requestedSong.data;
  }

  deleteRequestedSong(songId: number) {
    return this.http.delete(`/users/me/music-request-songs/${songId}`);
  }
}
