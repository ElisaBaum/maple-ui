import * as React from 'react';
import {Modal} from '../../../../layout/components/modal/Modal';
import './DeleteSectionModal.scss';

export const DeleteSectionModal = ({section, onDeleteSection, onClose}) => (
  <Modal title={'Gallerie löschen'}
         renderContent={() => <div className={'delete-section-modal'}>
           Möchtest du die Gallerie <b>{section.name}</b> wirklich löschen?
         </div>}
         actions={[
           {onClick: onDeleteSection, label: 'Löschen', isPrimary: true},
           {onClick: onClose, label: 'Abbrechen'},
         ]}/>
);
