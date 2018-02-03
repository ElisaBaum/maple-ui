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
import {MusicRequestLoading} from './music-request-loading/MusicRequestLoading';

interface MusicRequestsProps extends ContentComponentProps<MusicRequestsData> {
  loadingArtist?: boolean;
  loadingAlbum?: boolean;
  loadingSong?: boolean;
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
  const {requestedArtists, requestedSongs, requestedAlbums, loadingArtist, loadingAlbum, loadingSong} = props;
  const {content: {maxRequests}} = props;
  const {description, hint, lastFmApiKey} = props.content;
  const maxRequestsReached = (requestedArtists.length + requestedSongs.length + requestedAlbums.length) >= maxRequests.count;
  const showArtists = (!!requestedArtists.length || loadingArtist);
  const showSongs = (!!requestedSongs.length || loadingSong);
  const showAlbums = (!!requestedAlbums.length || loadingAlbum);
  const showSelects = showArtists || showSongs || showAlbums;

  return (
    <div>
      <Card>
        <Item>
          {description}
        </Item>
      </Card>
      <Card>
        {
          maxRequestsReached
            ? <Item>{maxRequests.hint}</Item>
            : <MusicAutoCompleteContainer apiKey={lastFmApiKey}
                                          onArtistSelect={onArtistSelect}
                                          onAlbumSelect={onAlbumSelect}
                                          onSongSelect={onSongSelect}/>
        }
      </Card>
      {
        showSelects &&
        <Card>
          {
            (showArtists) &&
            <ResultSection headline={'Künstler'}
                           results={requestedArtists
                             .map(({id, imageUrl, name}) => ({id, imageUrl, title: name}))}
                           isLoading={loadingArtist}
                           onDelete={onArtistDelete} />
          }
          {
            (showSongs) &&
            <ResultSection headline={'Lieder'}
                           results={requestedSongs
                             .map(({id, name, artist}) => ({id, title: name, subtitle: artist.name}))}
                           isLoading={loadingSong}
                           hasSubtitle={true}
                           onDelete={onSongDelete} />
          }
          {
            (showAlbums) &&
            <ResultSection headline={'Alben'}
                           results={requestedAlbums
                             .map(({id, name, artist, imageUrl}) => ({id, imageUrl, title: name, subtitle: artist.name}))}
                           isLoading={loadingAlbum}
                           hasSubtitle={true}
                           onDelete={onAlbumDelete} />
          }
        </Card>
      }
      <Card>
        <Item>
          {hint}
        </Item>
      </Card>
    </div>
  );
}

interface ResultSectionProps {
  headline: string;
  isLoading?: boolean;
  hasSubtitle?: boolean;
  onDelete: (id: number) => any;
  results: Array<{ id, title, subtitle?, imageUrl? }>;
}

function ResultSection({headline, isLoading, onDelete, results, hasSubtitle}: ResultSectionProps) {
  return (
    <div>
      <Headline text={headline}/>
      {
        results.map(item => (
          <Item key={item.id} className={'pr-0'}>
            <MusicRequest {...item} deleteFn={onDelete}/>
          </Item>
        ))
      }
      {
        isLoading
        && <Item>
          <MusicRequestLoading hasSubtitle={hasSubtitle}/>
        </Item>
      }
    </div>
  );
}
