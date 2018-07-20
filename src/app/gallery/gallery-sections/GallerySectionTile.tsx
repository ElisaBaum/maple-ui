import * as React from 'react';
import {Tile, TileAction, TileContent} from '../../layout/components/tile/Tile';

export const GallerySectionTile = ({section, onDelete, user}) => (
  <Tile centered>
    <TileContent title={section.name}
                 subtitle={section.party.users
                   .map(({name}) => name)
                   .join(' & ')}/>
    {user && user.partyId === section.partyId
    && (<TileAction>
      <button type="button"
              className="btn btn-link"
              onClick={() => onDelete(section)}>
        <i className="material-icons">clear</i>
      </button>
    </TileAction>)}
  </Tile>
);
