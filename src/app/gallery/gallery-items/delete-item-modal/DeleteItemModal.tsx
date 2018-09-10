import * as React from 'react';
import {Modal} from '../../../layout/components/modal/Modal';
import {Image} from '../../../layout/components/image/Image';
import './DeleteItemModal.scss';

export const DeleteItemModal = ({item, onDeleteItem, onClose}) => (
  <Modal title={'Bild löschen'}
         renderContent={() => <div className={'delete-item-modal'}>
           <Image src={item.resizedUrl}
                  size={'contain'}
                  className={'delete-item-image-preview'}/>
           <div>Möchtest du das Bild wirklich löschen?</div>
         </div>}
         actions={[
           {onClick: onDeleteItem, label: 'Löschen', isPrimary: true},
           {onClick: onClose, label: 'Abbrechen'},
         ]}/>
);
