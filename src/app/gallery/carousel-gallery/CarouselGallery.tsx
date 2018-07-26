import * as React from 'react';
import Carousel from '@baum/nuka-carousel';
import './CarouselGallery.scss';
import {Button} from '../../layout/components/button/Button';

export const CarouselGallery = ({items, onClose, transitionMode, currentIndex, onIndexChange}) => (
  <div className={'carousel-gallery'}>
    <Button className={'btn-clear carousel-gallery-close'}
            htmlType={'button'}
            onClick={onClose}> </Button>
    <Carousel renderCenterLeftControls={() => (<div></div>)}
              renderBottomCenterControls={() => (<div></div>)}
              renderCenterRightControls={() => (<div></div>)}
              transitionMode={transitionMode}
              cellAlign={'center'}
              afterSlide={onIndexChange}
              slideIndex={currentIndex}
              className={'actual-carousel'}>
      {items
        .map((_item, _i) => (
          <img key={_i} src={_item.resizedUrl}/>
        ))
      }
    </Carousel>
  </div>
);
