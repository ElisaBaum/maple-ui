import * as React from 'react';
import {Item} from '../../../layout/components/item/Item';
import {Image} from '../../../layout/components/image/Image';
import {addOverlay} from '../../../layout/components/overlay/OverlayContainer';
import {GalleryItemsContainer} from '../../gallery-items/GalleryItemsContainer';
import {CarouselGalleryContainer} from '../../carousel-gallery/CarouselGalleryContainer';
import {Headline} from '../../../layout/components/headline/Headline';
import {Button} from '../../../layout/components/button/Button';
import {Hide} from '../../../layout/components/hide/Hide';
import {LinkButton} from '../../../layout/components/link-button/LinkButton';
import {GALLERY_SECTION_EDIT} from '../../Gallery';
import {ShowIfOwner} from '../../../layout/components/show-if-owner/ShowIfOwner';
import './GallerySection.scss';

export const GallerySection = ({section, download, zipping}) => {
  const renderDownloadButton = (props: any = {}) => (<Button type={'primary'}
                                                             htmlType={'button'}
                                                             onClick={() => download()}
                                                             loading={zipping}
                                                             {...props}>
    Download
  </Button>);
  const renderEditButton = (props: any = {}) => (<ShowIfOwner partyId={section.partyId}>
    <LinkButton target={GALLERY_SECTION_EDIT(section.id)}
                type={'primary'}
                {...props}>
      Bearbeiten
    </LinkButton>
  </ShowIfOwner>);

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
          {renderDownloadButton({style: {width: '100%', margin: '0 .2rem'}})}
          {renderEditButton({style: {width: '100%', margin: '0 .2rem'}})}
        </Item>
      </Hide>
      <div className={'gallery-section-items'}>
        <GalleryItemsContainer sectionId={section.id}
                               itemsRender={({items, onLoadMore}) => items.map((item, i) => {
                                 if (/video/.test(item.type)) {
                                   return (
                                     <div key={i} className={'gallery-section-video-wrapper'}>
                                       <video width={'100%'} height={'100%'} controls>
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
                                     <div className={'gallery-section-image-wrapper-wrapper'}>
                                       <Image size={'cover'}
                                              className={'gallery-section-image '}
                                              position={'center'} src={item.resizedUrl}/>
                                     </div>
                                   </div>
                                 );
                               })}>
        </GalleryItemsContainer>
      </div>
    </div>
  );
};

