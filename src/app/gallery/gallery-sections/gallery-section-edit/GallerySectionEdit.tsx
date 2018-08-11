import * as React from 'react';
import {Form} from '../../../layout/components/form/Form';
import {FormTextField} from '../../../layout/components/form/form-text-field/FormTextField';
import {GalleryItemTile} from '../../gallery-items/GalleryItemTile';
import {FileSelectButton} from '../../../layout/components/file-select/FileSelect';
import {Item} from '../../../layout/components/item/Item';
import {GalleryItemsContainer} from '../../gallery-items/GalleryItemsContainer';
import {Tile, TileContent, TileIcon, TileProgress} from '../../../layout/components/tile/Tile';
import {Card} from '../../../layout/components/card/Card';

interface GallerySectionEditProps {
  section;
  newItems: any[];

  onUpload(fileList: FileList);

  onSectionChange(section);
}

export const GallerySectionEdit = ({
                                     section,
                                     newItems,
                                     onUpload,
                                     onSectionChange,
                                   }: GallerySectionEditProps) => {
  const completedItems = newItems.filter(item => item.completed);

  return (
    <div className={'gallery-section-edit'}>
      <Card>
        <Form values={section}
              onSubmit={({isValid, values}) => isValid && onSectionChange(values)}>
          <FormTextField submitOnChange
                         name="name"
                         label="Galleriename"
                         required={'Bitte Namen eingeben!'}/>
        </Form>
        <Item>
          <FileSelectButton button
                            onFilesChanged={fileList => onUpload(fileList)}
                            accept={['image/*', 'video/*', 'audio/*']}>
            Lade neue Bilder/Videos hoch
          </FileSelectButton>
        </Item>
        {!!newItems.length && (
          <Tile item centered>
            <TileIcon icon={'collections'} size={'large'}/>
            <TileContent title={`${completedItems.length} von ${newItems.length} verarbeitet`}/>
            <TileProgress progress={completedItems.length / newItems.length}/>
          </Tile>
        )}
        <GalleryItemsContainer sectionId={section.id}
                               itemsRender={({items, onDeleteItem}) => [...newItems, ...items].map((item, i) => (
                                 <GalleryItemTile key={i} item={item} onDelete={onDeleteItem}/>
                               ))}/>
      </Card>
    </div>
  );
};
