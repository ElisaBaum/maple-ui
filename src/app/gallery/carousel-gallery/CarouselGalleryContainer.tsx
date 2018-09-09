import * as React from 'react';
import {Component} from 'react';
import {CarouselGallery} from './CarouselGallery';
import {GalleryItemsService} from '../gallery-items/GalleryItemsService';
import {Inject} from 'react.di';
import {Subscription} from 'rxjs';
import axios from 'axios';
import {toast} from 'react-toastify';

interface CarouselGalleryContainerProps {
  initialIndex: number;

  onLoadMore();

  onClose();
}

interface CarouselGalleryContainerState {
  items: any[];
  currentIndex: number;
  isDownloadingItem?: boolean;
}

export class CarouselGalleryContainer extends Component<CarouselGalleryContainerProps, CarouselGalleryContainerState> {

  @Inject galleryItemsService: GalleryItemsService;

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

  async handleDownload(item) {
    this.setState({isDownloadingItem: true});
    try {
      const response = await axios({
        url: item.originalUrl,
        method: 'GET',
        responseType: 'blob',
      });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([response.data]));
      link.setAttribute('download', item.originalName);
      document.body.appendChild(link);
      link.click();
    } catch (e) {
      toast.error(e.toString());
    } finally {
      this.setState({isDownloadingItem: false});
    }
  }

  render() {
    const {currentIndex, items, isDownloadingItem} = this.state;
    const {onClose} = this.props;
    return (
      <CarouselGallery items={items}
                       isDownloadingItem={isDownloadingItem}
                       onIndexChange={(curr) => this.handleIndexChange(curr)}
                       onClose={onClose}
                       onDownloadItem={item => this.handleDownload(item)}
                       currentIndex={currentIndex}/>
    );
  }
}
