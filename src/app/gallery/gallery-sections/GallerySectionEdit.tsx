import * as React from 'react';
import {Form} from '../../layout/components/form/Form';
import {FormTextField} from '../../layout/components/form/form-text-field/FormTextField';
import {GalleryItemTile} from '../gallery-items/GalleryItemTile';
import {FileSelectButton} from '../../layout/components/file-select/FileSelect';
import {Item} from '../../layout/components/item/Item';
import {GalleryItemsContainer} from '../gallery-items/GalleryItemsContainer';

export const GallerySectionEdit = ({
                                     section,
                                     newItems,
                                     onUpload,
                                     onDeleteItem,
                                     onSectionChange,
                                   }) => (
  <div>
    <Form values={section}
          onSubmit={({isValid, values}) => isValid && onSectionChange(values)}>
      <FormTextField submitOnChange
                     name="name"
                     label="Galleriename"
                     required={'Bitte Namen eingeben!'}/>
    </Form>
    <Item>
      <FileSelectButton button
                        onFilesChanged={files => onUpload(files)}
                        accept={['image/*', 'video/*', 'audio/*']}>
        Lade neue Bilder/Videos hoch
      </FileSelectButton>
    </Item>
    <GalleryItemsContainer items={newItems}
                           sectionId={section.id}
                           itemsRender={({items}) => items.map((item, i) => (
                             <GalleryItemTile key={i} item={item} onDelete={onDeleteItem}/>
                           ))}/>
  </div>
);
