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
import {GALLERY_SECTION_EDIT, GALLERY_SECTIONS} from '../../Gallery';
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
  const renderEditButton = () => (<ShowIfOwner partyId={section.partyId}>
    <LinkButton target={GALLERY_SECTION_EDIT(section.id)}
                type={'primary'}>
      Bearbeiten
    </LinkButton>
  </ShowIfOwner>);
  const renderAllButtonLink = () => (<LinkButton target={GALLERY_SECTIONS}
                                                     type={'primary'}>
    Zurück
  </LinkButton>);

  return (
    <div className={'gallery-section'}>
      <Item className={'g-nav'}>
        <Headline className={'gallery-section-headline'}
                  text={section.name}/>
        <Hide whenLessThan={'md'}>
          <div className={'g-nav-controls'}>
            {renderAllButtonLink()}
            {renderDownloadButton()}
            {renderEditButton()}
          </div>
        </Hide>
      </Item>
      <Hide whenAtLeast={'md'}>
        <Item className={'gallery-section-btns-item'}>
          {renderAllButtonLink()}
          {renderDownloadButton()}
          {renderEditButton()}
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

