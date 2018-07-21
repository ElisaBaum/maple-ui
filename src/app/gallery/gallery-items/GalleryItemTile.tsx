import * as React from 'react';
import {Tile, TileAction, TileAvatar, TileContent, TileIcon, TileProgress} from '../../layout/components/tile/Tile';
import {GalleryItem} from './GalleryItem';

interface GalleryItemTileProps {
  item: GalleryItem;

  onDelete(item: GalleryItem);
}

export const GalleryItemTile = ({item, onDelete}: GalleryItemTileProps) => (
  <Tile centered item>
    <GalleryItemTileAvatar item={item}/>
    <TileContent title={item.originalName}
                 subtitle={item.title || item.lastModifiedAt}/>
    <TileAction>
      <button type="button"
              className="btn btn-link"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                onDelete(item);
              }}>
        <i className="material-icons">clear</i>
      </button>
    </TileAction>
    {item.isNew && <TileProgress progress={item.progress}/>}
  </Tile>
);

const GalleryItemTileAvatar = ({item}: { item: GalleryItem }) => {
  if (!item.isNew) {
    return (<TileAvatar imageUrl={item.resizedUrl} rounded={false}/>);
  } else if (!item.completed) {
    return (<TileIcon icon={'cloud_upload'}/>);
  }
  return (<TileIcon icon={'check_circle_outline'}/>);
};
