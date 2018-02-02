import * as React from 'react';
import {Tile, TileAction, TileAvatar, TileContent, TileIcon} from '../layout/components/tile/Tile';

interface MusicRequestProps {
  id: number;
  title: string;
  subtitle?: string;
  imageUrl?: string;

  deleteFn(id);
}

export function MusicRequest({id, title, subtitle, imageUrl, deleteFn}: MusicRequestProps) {
  return (
    <Tile centered>
      {
        imageUrl ?
          <TileAvatar imageUrl={imageUrl}/> :
          <TileIcon icon={'library_music'}/>
      }
      <TileContent title={title} subtitle={subtitle}/>
      <TileAction>
        <button type="button" className="btn btn-link" onClick={() => deleteFn(id)}>
          <i className="material-icons">clear</i>
        </button>
      </TileAction>
    </Tile>
  );
}
