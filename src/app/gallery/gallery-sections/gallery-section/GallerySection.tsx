import * as React from 'react';
import {Item} from '../../../layout/components/item/Item';
import {Image} from '../../../layout/components/image/Image';
import {addOverlay} from '../../../layout/components/overlay/OverlayContainer';
import {GalleryItemsContainer} from '../../gallery-items/GalleryItemsContainer';
import {CarouselGalleryContainer} from '../../carousel-gallery/CarouselGalleryContainer';
import {Headline} from '../../../layout/components/headline/Headline';
import {Button} from '../../../layout/components/button/Button';
import './GallerySection.scss';
import {Hide} from '../../../layout/components/hide/Hide';

export const GallerySection = ({section}) => {
  const renderDownloadButton = (props: any = {}) => (<Button type={'primary'}
                                                             htmlType={'button'}
                                                             onClick={() => null}
                                                             {...props}>
    Download
  </Button>);
  const renderEditButton = (props: any = {}) => (<Button type={'primary'}
                                                         htmlType={'button'}
                                                         onClick={() => null}
                                                         {...props}>
    Bearbeiten
  </Button>);

  return (
    <div className={'gallery-section'}>
      <Item className={'g-nav'}>
        <Headline className={'gallery-section-headline'}
                  text={section.name}/>
        <Hide whenLessThan={'md'}>
          <div className={'g-nav-controls'}>
            {renderDownloadButton()}
            {renderEditButton()}
          </div>
        </Hide>
      </Item>
      <Hide whenAtLeast={'md'}>
        <Item style={{display: 'flex'}}>
          {renderDownloadButton({className: 'btn-block', style: {margin: '0 .2rem'}})}
          {renderEditButton({className: 'btn-block', style: {margin: '0 .2rem'}})}
        </Item>
      </Hide>
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
                                                                     initialIndex={i}/>))}
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
};

