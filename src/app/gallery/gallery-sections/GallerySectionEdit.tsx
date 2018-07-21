import * as React from 'react';
import {Form} from '../../layout/components/form/Form';
import {FormTextField} from '../../layout/components/form/form-text-field/FormTextField';
import {GalleryItemTile} from '../gallery-items/GalleryItemTile';
import {FileSelectButton} from '../../layout/components/file-select/FileSelect';
import {Item} from '../../layout/components/item/Item';

export const GallerySectionEdit = ({section, items, onUpload, onDeleteItem, onSectionChange}) => (
  <div>
    <Form values={section}
          onSubmit={({isValid, values}) => isValid && onSectionChange(values)}>
      <FormTextField submitOnChange
                     name="name"
                     label="Section-Name"
                     required={'Bitte Section-Namen eingeben!'}/>
    </Form>
    <Item>
      <FileSelectButton button
                        onFilesChanged={files => onUpload(files)}
                        accept={['image/*', 'video/*', 'audio/*']}>
        Lade neue Bilder/Videos hoch
      </FileSelectButton>
    </Item>
    {items.map((item, i) => (
      <GalleryItemTile key={i} item={item} onDelete={onDeleteItem}/>
    ))}
  </div>
);
