import * as React from 'react';
import {ContentComponentProps} from "../dynamic-content/ContentContainer";
import {MusicRequestsData} from "./MusicRequestsData";
import {MusicAutoCompleteContainer} from "./MusicAutoCompleteContainer";
import {Song} from "./Song";
import {Album} from "./Album";
import {Artist} from "./Artist";

interface MusicRequestsProps extends ContentComponentProps<MusicRequestsData> {
  onArtistSelect(artist: Artist);
  onAlbumSelect(album: Album);
  onSongSelect(song: Song);
}

export function MusicRequests(props: MusicRequestsProps) {
  const {onArtistSelect, onAlbumSelect, onSongSelect, content} = props;
  const {lastFmApiKey} = content;

  return (
    <div>
      <MusicAutoCompleteContainer apiKey={lastFmApiKey}
                                  onArtistSelect={onArtistSelect}
                                  onAlbumSelect={onAlbumSelect}
                                  onSongSelect={onSongSelect}/>
    </div>
  );
}
