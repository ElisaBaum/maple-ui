import * as React from 'react';
import {Component} from "react";
import {ContentContainer} from "../dynamic-content/ContentContainer";
import {MusicRequests} from "./MusicRequests";
import {MusicRequestsData} from "./MusicRequestsData";
import {LastFmSong} from "./last-fm/LastFmSong";
import {LastFmAlbum} from "./last-fm/LastFmAlbum";
import {LastFmArtist} from "./last-fm/LastFmArtist";
import {Inject, Module} from "react.di";
import {MusicRequestsHttpService} from "./MusicRequestsHttpService";
import {RequestedArtist} from "./RequestedArtist";
import {RequestedAlbum} from "./RequestedAlbum";
import {RequestedSong} from "./RequestedSong";
import {LastFmMusicImage} from "./last-fm/LastFmMusicImage";
import {toast} from "react-toastify";
import {LastFmModule} from './last-fm/LastFmModule';
import {LastFmHttpService} from './last-fm/LastFmHttpService';

interface MusicRequestsContainerState {
  action?: Promise<any>;
  requestedArtists: RequestedArtist[];
  requestedAlbums: RequestedAlbum[];
  requestedSongs: RequestedSong[];
  loadingArtist?: boolean;
  loadingSong?: boolean;
  loadingAlbum?: boolean;
}

@Module({
  imports: [LastFmModule],
  providers: [
    MusicRequestsHttpService
  ]
})
export class MusicRequestsContainer extends Component<{}, MusicRequestsContainerState> {

  @Inject musicRequestsHttpService: MusicRequestsHttpService;
  @Inject lastFmHttpService: LastFmHttpService;

  constructor(props) {
    super(props);
    this.state = {
      requestedArtists: [],
      requestedAlbums: [],
      requestedSongs: [],
    };
  }

  async componentWillMount() {
    this.setState({
      action: Promise.all([
        this.loadRequestedArtists(),
        this.loadRequestedAlbums(),
        this.loadRequestedSongs()
      ])
    });
  }

  async loadRequestedArtists() {
    const requestedArtists = await this.musicRequestsHttpService.getRequestedArtists();
    this.setState({requestedArtists});
  }

  async loadRequestedAlbums() {
    const requestedAlbums = await this.musicRequestsHttpService.getRequestedAlbums();
    this.setState({requestedAlbums});
  }

  async loadRequestedSongs() {
    const requestedSongs = await this.musicRequestsHttpService.getRequestedSongs();
    this.setState({requestedSongs});
  }

  async addSelectedArtist(artist: LastFmArtist) {
    this.setState({loadingArtist: true});
    await this.processAction(async () => {
      if (!this.state.requestedArtists.some(currentArtist => currentArtist.url === artist.url)) {
        const requestedArtist = await this.musicRequestsHttpService.addRequestedArtist(
          this.getRequestedArtist(artist)
        );
        this.setState(prevState => ({
          requestedArtists: [...prevState.requestedArtists, requestedArtist],
        }));
      }
    });
    this.setState({loadingArtist: false});
  }

  async addSelectedAlbum(album: LastFmAlbum) {
    this.setState({loadingAlbum: true});
    await this.processAction(async () => {
      if (!this.state.requestedAlbums.some(currentAlbum => currentAlbum.url === album.url)) {
        const requestedAlbum = await this.musicRequestsHttpService.addRequestedAlbum({
          name: album.name,
          url: album.url,
          imageUrl: this.getImageUrl(album.image),
          artist: await this.getRequestedArtistByName(album.artist),
        });

        this.setState(prevState => ({
          requestedAlbums: [...prevState.requestedAlbums, requestedAlbum],
        }));
      }
    });
    this.setState({loadingAlbum: false});
  }

  async addSelectedSong(song: LastFmSong) {
    this.setState({loadingSong: true});
    await this.processAction(async () => {
      if (!this.state.requestedSongs.some(currentSong => currentSong.url === song.url)) {
        const requestedSong = await this.musicRequestsHttpService.addRequestedSong({
          name: song.name,
          url: song.url,
          artist: await this.getRequestedArtistByName(song.artist),
        });

        this.setState(prevState => ({
          requestedSongs: [...prevState.requestedSongs, requestedSong],
        }));
      }
    });
    this.setState({loadingSong: false});
  }

  async deleteRequestedArtist(artistId: number) {
    this.setState(prevState => ({
      requestedArtists: prevState.requestedArtists.filter(artist => artist.id !== artistId)
    }));
    this.processAction(async () => {
      await this.musicRequestsHttpService.deleteRequestedArtist(artistId);
    });
  }

  async deleteRequestedAlbum(albumId: number) {
    this.setState(prevState => ({
      requestedAlbums: prevState.requestedAlbums.filter(album => album.id !== albumId)
    }));
    this.processAction(async () => {
      await this.musicRequestsHttpService.deleteRequestedAlbum(albumId);
    });
  }

  async deleteRequestedSong(songId: number) {
    this.setState(prevState => ({
      requestedSongs: prevState.requestedSongs.filter(song => song.id !== songId)
    }));
    this.processAction(async () => {
      await this.musicRequestsHttpService.deleteRequestedSong(songId);
    });
  }

  async processAction(action: () => Promise<void>) {
    try {
      await action();
      toast.dismiss();
    } catch (e) {
      toast.error(<p>Es ist ein Fehler aufgetreten. Bitte versuche es erneut.</p>);
    }
  }

  async getRequestedArtistByName(name: string) {
    const artistInfo = await this.lastFmHttpService.getArtistInfo(name);
    if (artistInfo && artistInfo.artist) {
        return this.getRequestedArtist(artistInfo.artist);
     }
  }

  getRequestedArtist(artist: LastFmArtist) {
    return artist && {
      name: artist.name,
      url: artist.url,
      imageUrl: this.getImageUrl(artist.image)
    };
  }

  getImageUrl(images: LastFmMusicImage[]) {
    if (images) {
      const image = images.find(currentImage => currentImage.size === 'large');
      return (image && image["#text"]) || images[images.length - 1]["#text"];
    }
  }

  render() {
    const {action, requestedArtists, requestedAlbums, requestedSongs, loadingArtist, loadingAlbum, loadingSong} = this.state;
    return (
      <ContentContainer contentKey={'music-requests'} action={action} render={(content: MusicRequestsData) => (
        <MusicRequests content={content}
                       loadingArtist={loadingArtist}
                       loadingAlbum={loadingAlbum}
                       loadingSong={loadingSong}
                       requestedArtists={requestedArtists}
                       requestedAlbums={requestedAlbums}
                       requestedSongs={requestedSongs}
                       onArtistSelect={(artist) => this.addSelectedArtist(artist)}
                       onAlbumSelect={(album) => this.addSelectedAlbum(album)}
                       onSongSelect={(song) => this.addSelectedSong(song)}
                       onArtistDelete={(artistId) => this.deleteRequestedArtist(artistId)}
                       onAlbumDelete={(albumId) => this.deleteRequestedAlbum(albumId)}
                       onSongDelete={(songId) => this.deleteRequestedSong(songId)}/>
      )}/>
    );
  }
}
