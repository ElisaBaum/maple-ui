import * as React from 'react';
import {Item} from '../../../layout/components/item/Item';
import {Image} from '../../../layout/components/image/Image';
import {addOverlay} from '../../../layout/components/overlay/OverlayContainer';
import './GallerySection.scss';
import {GalleryItemsContainer} from '../../gallery-items/GalleryItemsContainer';
import {CarouselGalleryContainer} from '../../carousel-gallery/CarouselGalleryContainer';

export const GallerySection = ({section}) => (
  <div className={'gallery-section'}>
    <Item>
      <div>{section.name}</div>
    </Item>
    <div className={'gallery-section-items'}>
      <GalleryItemsContainer sectionId={section.id}
                             itemsRender={({items, onLoadMore}) => items.map((item, i) => {
                               if (/video/.test(item.type)) {
                                 return (
                                   <div key={i} className={'gallery-section-video-wrapper'}>
                                     <video width={'100%'} controls>
                                       <source src={item.originalUrl} type={item.type}/>
                                     </video>
                                   </div>
                                 );
                               }
                               return (
                                 <div key={i}
                                      onClick={() => addOverlay(({onCloseOverlay}) =>
                                        (<CarouselGalleryContainer onClose={onCloseOverlay}
                                                                   onLoadMore={onLoadMore}
                                                                   initialIndex={i} />))}
                                      className={'gallery-section-image-wrapper'}>
                                   <Image size={'cover'}
                                          position={'center'} src={item.resizedUrl}/>
                                 </div>
                               );
                             })}>
      </GalleryItemsContainer>
    </div>
  </div>
);

