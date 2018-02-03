import * as React from 'react';
import {Component} from "react";
import {AutoComplete} from "../layout/components/auto-complete/AutoComplete";
import {LastFmHttpService} from "./last-fm/LastFmHttpService";
import {Inject} from "react.di";
import {LastFmMusicServiceError} from "./last-fm/LastFmMusicServiceError";
import {toast} from "react-toastify";
import {LastFmArtist} from "./last-fm/LastFmArtist";
import {LastFmAlbum} from "./last-fm/LastFmAlbum";
import {LastFmSong} from "./last-fm/LastFmSong";
import {AutoCompleteResultSection} from "../layout/components/auto-complete-result-section/AutoCompleteResultSection";
import {Tile, TileAvatar, TileContent, TileIcon} from '../layout/components/tile/Tile';

interface MusicAutoCompleteProps {
  onArtistSelect(artist: LastFmArtist);

  onAlbumSelect(album: LastFmAlbum);

  onSongSelect(song: LastFmSong);
}

interface MusicAutoCompleteState {
  artists: LastFmArtist[];
  albums: LastFmAlbum[];
  songs: LastFmSong[];
  loading?: boolean;
}

export class MusicAutoCompleteContainer extends Component<MusicAutoCompleteProps, MusicAutoCompleteState> {

  @Inject lastFmService: LastFmHttpService;

  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      albums: [],
      songs: []
    };
  }

  cancelSearches() {
    this.cancelArtistsSearch();
    this.cancelAlbumsSearch();
    this.cancelSongsSearch();
  }

  cancelArtistsSearch = () => null;
  cancelAlbumsSearch = () => null;
  cancelSongsSearch = () => null;

  async onSearch(searchTerm: string) {
    this.setState({loading: true});
    try {
      const [artists, songs, albums] = await Promise.all([
        this.lastFmService.searchArtists(searchTerm, cancel => this.cancelArtistsSearch = cancel),
        this.lastFmService.searchSongs(searchTerm, cancel => this.cancelSongsSearch = cancel),
        this.lastFmService.searchAlbums(searchTerm, cancel => this.cancelAlbumsSearch = cancel)
      ]);
      this.setState({artists, albums, songs});
      toast.dismiss();
    } catch (e) {
      if (!e.__CANCEL__) {
        this.handleRequestError(e);
      }
    } finally {
      this.setState({loading: false});
    }
  }

  async onSelect(index: number, sectionKey?: string) {
    if (sectionKey) {
      const {onArtistSelect, onAlbumSelect, onSongSelect} = this.props;
      const handlerMap = {albums: onAlbumSelect, artists: onArtistSelect, songs: onSongSelect};
      try {
        handlerMap[sectionKey](this.state[sectionKey][index]);
      } catch (e) {
        this.handleRequestError(e);
      }
    }
  }

  onClear() {
    this.setState({
      artists: [],
      albums: [],
      songs: []
    });
  }

  handleRequestError(e) {
    const errorCode = e instanceof LastFmMusicServiceError ? (e as LastFmMusicServiceError).errorCode : undefined;
    const errorMessage = `Es ist ein Fehler aufgetreten${errorCode ? ` (Code: ${errorCode})` : ''}. Bitte versuche es erneut.`;
    toast.error(<p>{errorMessage}</p>);
  }

  render() {
    const {artists, albums, songs, loading} = this.state;
    return (
      <AutoComplete placeholder="Künstler, Album oder Lied"
                    loading={loading}
                    onSearch={(searchTerm) => this.onSearch(searchTerm)}
                    onSelect={(index, sectionKey) => this.onSelect(index, sectionKey)}
                    cancelPreviousSearch={() => this.cancelSearches()}
                    onClear={() => this.onClear()}>

        {
          artists.length &&
          <AutoCompleteResultSection sectionName="Künstler" sectionKey="artists">
            {artists.map(({name, image: [_, __, imageUrl]}, index) => (
              <Tile centered key={index}>
                <TileAvatar imageUrl={imageUrl['#text']}/>
                <TileContent title={name}/>
              </Tile>
            ))}
          </AutoCompleteResultSection>
        }

        {
          songs.length &&
          <AutoCompleteResultSection sectionName="Lieder" sectionKey="songs">
            {songs.map(({name, artist}, index) => (
              <Tile key={index}>
                <TileIcon icon={'library_music'}/>
                <TileContent title={name} subtitle={artist}/>
              </Tile>
            ))}
          </AutoCompleteResultSection>
        }

        {
          albums.length &&
          <AutoCompleteResultSection sectionName="Alben" sectionKey="albums">
            {albums.map(({name, image: [_, __, imageUrl], artist}, index) => (
              <Tile centered key={index}>
                <TileAvatar imageUrl={imageUrl['#text']}/>
                <TileContent title={name} subtitle={artist}/>
              </Tile>
            ))}
          </AutoCompleteResultSection>
        }

      </AutoComplete>
    );
  }

}
