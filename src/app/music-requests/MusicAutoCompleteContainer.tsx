import * as React from 'react';
import {Component} from "react";
import {AutoComplete} from "../layout/components/auto-complete/AutoComplete";
import {LastFmHttpService} from "./LastFmHttpService";
import {Inject, Module} from "react.di";
import {MusicServiceError} from "./MusicServiceError";
import {toast} from "react-toastify";
import {Artist} from "./Artist";
import {Album} from "./Album";
import {Song} from "./Song";
import {AutoCompleteResultSection} from "../layout/components/auto-complete-result-section/AutoCompleteResultSection";

interface MusicAutoCompleteProps {
  apiKey: string;
  onArtistSelect(artist: Artist);
  onAlbumSelect(album: Album);
  onSongSelect(song: Song);
}

interface MusicAutoCompleteState {
  artists: Artist[];
  albums: Album[];
  songs: Song[];
}

@Module({
  providers: [
    LastFmHttpService,
  ]
})
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

  async searchForArtist(searchTerm: string) {
    const {apiKey} = this.props;
    try {
      const [artists, songs, albums] = await Promise.all([
        this.lastFmService.searchArtists(searchTerm, apiKey, cancel => this.cancelArtistsSearch = cancel),
        this.lastFmService.searchSongs(searchTerm, apiKey, cancel => this.cancelSongsSearch = cancel),
        this.lastFmService.searchAlbums(searchTerm, apiKey, cancel => this.cancelAlbumsSearch = cancel)
      ]);
      this.setState({artists, albums, songs});
      toast.dismiss();
    } catch (e) {
      const errorCode = e instanceof MusicServiceError ? (e as MusicServiceError).errorCode : undefined;
      const errorMessage = `Es ist ein Fehler aufgetreten${errorCode ? ` (Code: ${errorCode})` : ''}. Bitte versuche es erneut.`;
      toast.error(<p>{errorMessage}</p>);
    }
  }

  onSelect(index: number, sectionKey?: string) {
    if (sectionKey) {
      const {onArtistSelect, onAlbumSelect, onSongSelect} = this.props;
      const listenerMap = {
        artists: onArtistSelect,
        albums: onAlbumSelect,
        songs: onSongSelect,
      };
      listenerMap[sectionKey](this.state[sectionKey][index]);
    }
  }

  onClear() {
    this.setState({
      artists: [],
      albums: [],
      songs: []
    });
  }

  render() {
    const {artists, albums, songs} = this.state;
    return (
      <AutoComplete placeholder="Künstler, Album oder Lied"
                    onSearch={(searchTerm) => this.searchForArtist(searchTerm)}
                    onSelect={(index, sectionKey) => this.onSelect(index, sectionKey)}
                    cancelPreviousSearch={() => this.cancelSearches()}
                    onClear={() => this.onClear()}>

        {
          artists.length &&
          <AutoCompleteResultSection sectionName="Künstler" sectionKey="artists">
            {artists.map(({name}, index) => (<div key={index} className="data">{name}</div>))}
          </AutoCompleteResultSection>
        }

        {
          songs.length &&
          <AutoCompleteResultSection sectionName="Lieder" sectionKey="songs">
            {songs.map(({name}, index) => (<div key={index} className="data">{name}</div>))}
          </AutoCompleteResultSection>
        }

        {
          albums.length &&
          <AutoCompleteResultSection sectionName="Alben" sectionKey="albums">
            {albums.map(({name}, index) => (<div key={index} className="data">{name}</div>))}
          </AutoCompleteResultSection>
        }

      </AutoComplete>
    );
  }

}
