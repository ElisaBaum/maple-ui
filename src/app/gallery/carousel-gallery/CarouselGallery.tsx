import * as React from 'react';
// import Carousel from '@baum/nuka-carousel';
import Slider from 'react-slick';
import {Button} from '../../layout/components/button/Button';
import './CarouselGallery.scss';
import {Icon} from '../../layout/components/icon/Icon';
// import '../../../../node_modules/slick-carousel/slick/slick.scss';
// import '../../../../node_modules/slick-carousel/slick/slick-theme.scss';

export const CarouselGallery = ({items, onClose, currentIndex, onIndexChange}) => (
  <div className={'carousel-gallery'}>
    <div className={'carousel-gallery-nav'}>
      <Button type={'link'}
              htmlType={'button'}
              onClick={onClose}>
        <Icon name={'question_answer'}/>
      </Button>
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
    {/*<Carousel itemLength={items.length}*/}
    {/*renderItem={(index, modIndex) => (*/}
    {/*<img key={index}*/}
    {/*style={{width: '100%'}}*/}
    {/*src={items[modIndex].resizedUrl}/>*/}
    {/*)}/>*/}
    <Slider speed={200}
            initialSlide={currentIndex}
            afterChange={onIndexChange}>
      {items
        .map((_item, _i) => (
          <img key={_i}
               src={_item.resizedUrl}/>
        ))
      }
    </Slider>
  </div>
);
