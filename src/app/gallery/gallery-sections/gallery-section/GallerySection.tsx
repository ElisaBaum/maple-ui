import * as React from 'react';
import {Item} from '../../../layout/components/item/Item';
import {Image} from '../../../layout/components/image/Image';
import './GallerySection.scss';
import {GalleryItemsContainer} from '../../gallery-items/GalleryItemsContainer';

export const GallerySection = ({section}) => (
  <div className={'gallery-section'}>
    <Item>
      <div>{section.name}</div>
    </Item>
    <div className={'gallery-section-items'}>
      <GalleryItemsContainer sectionId={section.id}
      itemsRender={({items}) => items.map((item, i) => {
        if (isVideo(item.type)) {
          return (
            <div key={i} className={'gallery-section-video-wrapper'}>
              <video width={'100%'} controls>
                <source src={item.originalUrl} type={item.type}/>
              </video>
            </div>
          );
        }
        return (
          <div key={i} className={'gallery-section-image-wrapper'}>
            <Image size={'cover'} src={item.resizedUrl}/>
          </div>
        );
      })}>
      </GalleryItemsContainer>
    </div>
  </div>
);

function isVideo(type) {
  return /video/.test(type);
}
