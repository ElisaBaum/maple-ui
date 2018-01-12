import * as React from 'react';
import {ContentComponentProps} from "../dynamic-content/ContentContainer";
import {MusicRequestsData} from "./MusicRequestsData";
import {MusicAutoCompleteContainer} from "./MusicAutoCompleteContainer";
import {LastFmSong} from "./last-fm/LastFmSong";
import {LastFmAlbum} from "./last-fm/LastFmAlbum";
import {LastFmArtist} from "./last-fm/LastFmArtist";
import {RequestedArtist} from "./RequestedArtist";
import {RequestedAlbum} from "./RequestedAlbum";
import {RequestedSong} from "./RequestedSong";
import {MusicRequest} from "./MusicRequest";
import {Paragraph} from "../layout/components/content/Paragraph";

interface MusicRequestsProps extends ContentComponentProps<MusicRequestsData> {
  requestedArtists: RequestedArtist[];
  requestedAlbums: RequestedAlbum[];
  requestedSongs: RequestedSong[];
  onArtistSelect(artist: LastFmArtist);
  onAlbumSelect(album: LastFmAlbum);
  onSongSelect(song: LastFmSong);
  onArtistDelete(artistId: number);
  onAlbumDelete(albumId: number);
  onSongDelete(songId: number);
}

export function MusicRequests(props: MusicRequestsProps) {
  const {onArtistSelect, onAlbumSelect, onSongSelect, onArtistDelete, onAlbumDelete, onSongDelete} = props;
  const {requestedArtists, requestedSongs, requestedAlbums} = props;
  const {description, hint, lastFmApiKey} = props.content;

  return (
    <div>
      <Paragraph>
        {description}
      </Paragraph>
      <Paragraph>
        <MusicAutoCompleteContainer apiKey={lastFmApiKey}
                                    onArtistSelect={onArtistSelect}
                                    onAlbumSelect={onAlbumSelect}
                                    onSongSelect={onSongSelect}/>
      </Paragraph>

      {
        !!requestedArtists.length &&
          <Paragraph>
            <h5>Künstler</h5>
            {
              requestedArtists.map(artist => (
                <MusicRequest key={artist.id}
                              id={artist.id}
                              title={artist.name}
                              imageUrl={artist.imageUrl}
                              deleteFn={onArtistDelete}/>
              ))
            }
          </Paragraph>
      }

      {
        !!requestedSongs.length &&
          <Paragraph>
            <h5>Lieder</h5>
            {
              requestedSongs.map(song => (
                <MusicRequest key={song.id}
                              id={song.id}
                              title={song.name}
                              subtitle={song.artist.name}
                              deleteFn={onSongDelete}/>
              ))
            }
          </Paragraph>
      }

      {
        !!requestedAlbums.length &&
          <Paragraph>
            <h5>Alben</h5>
            {
              requestedAlbums.map(album => (
                <MusicRequest key={album.id}
                              id={album.id}
                              title={album.name}
                              subtitle={album.artist.name}
                              imageUrl={album.imageUrl}
                              deleteFn={onAlbumDelete}/>
              ))
            }
          </Paragraph>
      }
      <Paragraph>
        {hint}
      </Paragraph>
    </div>
  );
}
