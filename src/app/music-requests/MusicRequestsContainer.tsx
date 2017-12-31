import * as React from 'react';
import {Component} from "react";
import {ContentContainer} from "../dynamic-content/ContentContainer";
import {MusicRequests} from "./MusicRequests";
import {MusicRequestsData} from "./MusicRequestsData";
import {Song} from "./Song";
import {Album} from "./Album";
import {Artist} from "./Artist";

export class MusicRequestsContainer extends Component {

  constructor(props) {
    super(props);
  }

  addSelectedArtist(artist: Artist) {
    // TODO: implement me!
  }

  addSelectedAlbum(album: Album) {
    // TODO: implement me!
  }

  addSelectedSong(song: Song) {
    // TODO: implement me!
  }

  render() {
    return (
      <ContentContainer contentKey={'music-requests'} render={(content: MusicRequestsData) => (
        <MusicRequests content={content}
                       onArtistSelect={(artist) => this.addSelectedArtist(artist)}
                       onAlbumSelect={(album) => this.addSelectedAlbum(album)}
                       onSongSelect={(song) => this.addSelectedSong(song)}/>
      )}/>
    );
  }
}
