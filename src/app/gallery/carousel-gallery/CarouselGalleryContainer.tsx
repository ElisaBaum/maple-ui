import * as React from 'react';
import {Component} from 'react';
import {CarouselGallery} from './CarouselGallery';
import {GalleryItemsService} from '../gallery-items/GalleryItemsService';
import {Inject} from 'react.di';
import {Subscription} from 'rxjs';

interface CarouselGalleryContainerProps {
  initialIndex: number;

  onLoadMore(offset: number);

  onClose();
}

interface CarouselGalleryContainerState {
  items: any[];
  currentIndex: number;
}

const DUMMY_FULL_TRANSPARENT_BASE64_IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

export class CarouselGalleryContainer extends Component<CarouselGalleryContainerProps, CarouselGalleryContainerState> {

  @Inject galleryItemsService: GalleryItemsService;

  private itemsSubscription: Subscription;
  private isFirstRender = true;

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: props.initialIndex,
      items: [],
    };
  }

  componentWillMount() {
    this.itemsSubscription = this.galleryItemsService.items.subscribe(items => this.setState({items}));
  }


  componentWillUnmount(): void {
    this.itemsSubscription.unsubscribe();
  }

  handleIndexChange(prevOrNext, curr) {
    const {onLoadMore} = this.props;
    const {items} = this.state;
    this.setState({currentIndex: curr});
    this.isFirstRender = false;
    if (curr < prevOrNext) {
      const hasOneMoreItemToShow = !!items[prevOrNext];
      const hasTwoMoreItemToShow = !!items[prevOrNext + 1];
      console.log(hasOneMoreItemToShow, hasTwoMoreItemToShow);
      if (!hasOneMoreItemToShow) {
        console.log('fire' + 1);
        onLoadMore(items.length);
      } else if (!hasTwoMoreItemToShow) {
        console.log('fire' + 2);
        onLoadMore(items.length + 1);
      }
    }
  }

  render() {
    const {currentIndex, items} = this.state;
    const {onClose} = this.props;
    const transitionMode = this.isFirstRender ? 'fade' : 'scroll';
    const itemsToShow = this.isFirstRender && currentIndex !== 0
      ? items.map((item, i) => i === 0 ? {...item, resizedUrl: DUMMY_FULL_TRANSPARENT_BASE64_IMAGE} : item)
      : items;

    return (
      <CarouselGallery items={itemsToShow}
                       onIndexChange={(prev, curr) => this.handleIndexChange(prev, curr)}
                       transitionMode={transitionMode}
                       onClose={onClose}
                       currentIndex={currentIndex}/>
    );
  }
}
