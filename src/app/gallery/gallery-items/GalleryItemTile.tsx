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
    {item.id
    &&
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
    }
    {item.isNew && <TileProgress progress={item.progress}/>}
  </Tile>
);

const GalleryItemTileAvatar = ({item}) => {
  if (!item.isNew) {
    if (/video/.test(item.type)) {
      return (<TileIcon icon={'ondemand_video'} size={'large'}/>);
    }
    return (<TileAvatar size={'large'} imageUrl={item.resizedUrl} rounded={false}/>);
  } else if (!item.completed) {
    return (<TileIcon icon={'cloud_upload'} size={'large'}/>);
  }
  return (<TileIcon icon={'check_circle_outline'} size={'large'}/>);
};
