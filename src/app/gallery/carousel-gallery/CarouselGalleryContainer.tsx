import * as React from 'react';
import {Component} from 'react';
import {CarouselGallery} from './CarouselGallery';
import {GalleryItemsService} from '../gallery-items/GalleryItemsService';
import {Inject} from 'react.di';
import {Subscription} from 'rxjs';

interface CarouselGalleryContainerProps {
  initialIndex: number;

  onLoadMore();

  onClose();
}

interface CarouselGalleryContainerState {
  items: any[];
  currentIndex: number;
}

export class CarouselGalleryContainer extends Component<CarouselGalleryContainerProps, CarouselGalleryContainerState> {

  @Inject galleryItemsService: GalleryItemsService;

  itemsToShow: any[] = [];

  private itemsSubscription: Subscription;

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

  handleIndexChange(curr) {
    const {onLoadMore} = this.props;
    const {items} = this.state;
    this.setState({currentIndex: curr});
    const needMore = !items[curr + 6];
    if (needMore) {
      onLoadMore();
    }
  }

  render() {
    const {currentIndex, items} = this.state;
    const {onClose} = this.props;
    return (
      <CarouselGallery items={items}
                       onIndexChange={(curr) => this.handleIndexChange(curr)}
                       onClose={onClose}
                       currentIndex={currentIndex}/>
    );
  }
}
