import * as React from 'react';
import {FileSelectButton} from '../../layout/components/file-select/FileSelect';
import {Card} from '../../layout/components/card/Card';
import {Item} from '../../layout/components/item/Item';

export const GallerySection = ({section, items, onUpload}) => (
  <div>
    <Card>
      <Item>
        <div>{section.name}</div>
      </Item>
    </Card>
    <Item>
      <FileSelectButton onFilesChanged={files => onUpload(files)}
                        accept={['image/*', 'video/*', 'audio/*']}>
        Wähle neue Bilder und Videos
      </FileSelectButton>
    </Item>
    <Card>
      {items.map((item, i) => {
        if (isVideo(item.type)) {
          return (<video key={i} width={'100%'} controls>
            <source src={item.originalUrl} type={item.type}/>
          </video>);
        }
        return (<img key={i} width={'100%'} src={item.originalUrl} />);
      })}
    </Card>
  </div>
);

function isVideo(type) {
  return /video/.test(type);
}
