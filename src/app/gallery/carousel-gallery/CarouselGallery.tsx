import * as React from 'react';
import Slider from 'react-slick';
import {Button} from '../../layout/components/button/Button';
import {Image} from '../../layout/components/image/Image';
import {Icon} from '../../layout/components/icon/Icon';
import './CarouselGallery.scss';

export const CarouselGallery = ({items, onClose, currentIndex, onIndexChange}) => (
  <div className={'carousel-gallery'}>
    <div className={'carousel-gallery-nav'}>
      {/*<Button type={'link'}*/}
              {/*htmlType={'button'}*/}
              {/*onClick={onClose}>*/}
        {/*<Icon name={'question_answer'}/>*/}
      {/*</Button>*/}
      <Button type={'link'}
              htmlType={'button'}
              onClick={onClose}>
        <Icon name={'cloud_download'}/>
      </Button>
      <Button type={'link'}
              htmlType={'button'}
              onClick={onClose}>
        <Icon name={'close'}/>
      </Button>
    </div>
    <Slider speed={200}
            initialSlide={currentIndex}
            afterChange={onIndexChange}>
      {items
        .map((_item, _i) => (
          <Image key={_i}
                 src={_item.resizedUrl}/>
        ))
      }
    </Slider>
  </div>
);
