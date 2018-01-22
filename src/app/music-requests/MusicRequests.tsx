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
import {Item} from '../layout/components/item/Item';
import {Card} from '../layout/components/card/Card';
import {Headline} from '../layout/components/headline/Headline';

interface MusicRequestsProps extends ContentComponentProps<MusicRequestsData> {
  loading: boolean;
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
      <Card>
        <Item>
          {description}
        </Item>
      </Card>
      <Card>
        <Headline text={'Suche'} className={'pb-0'}/>
        <MusicAutoCompleteContainer apiKey={lastFmApiKey}
                                    onArtistSelect={onArtistSelect}
                                    onAlbumSelect={onAlbumSelect}
                                    onSongSelect={onSongSelect}/>
      </Card>
      <Card>
        {
          !!requestedArtists.length &&
          <div>
            <Headline text={'Künstler'}/>
            {
              requestedArtists.map(artist => (
                <Item key={artist.id} className={'pr-0'}>
                  <MusicRequest id={artist.id}
                                title={artist.name}
                                imageUrl={artist.imageUrl}
                                deleteFn={onArtistDelete}/>
                </Item>
              ))
            }
          </div>
        }

        {
          !!requestedSongs.length &&
          <div>
            <Headline text={'Lieder'}/>
            {
              requestedSongs.map(song => (
                <Item key={song.id} className={'pr-0'}>
                  <MusicRequest id={song.id}
                                title={song.name}
                                subtitle={song.artist.name}
                                deleteFn={onSongDelete}/>
                </Item>
              ))
            }
          </div>
        }

        {
          !!requestedAlbums.length &&
          <div>
            <Headline text={'Alben'}/>
            {
              requestedAlbums.map(album => (
                <Item key={album.id} className={'pr-0'}>
                  <MusicRequest id={album.id}
                                title={album.name}
                                subtitle={album.artist.name}
                                imageUrl={album.imageUrl}
                                deleteFn={onAlbumDelete}/>
                </Item>
              ))
            }
          </div>
        }
      </Card>
      <Card>
        <Item>
          {hint}
        </Item>
      </Card>
    </div>
  );
}
