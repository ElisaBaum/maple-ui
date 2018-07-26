import * as React from 'react';
import {Component} from 'react';
import {InfiniteScroll} from '../../layout/components/infinite-scroll/InfiniteScroll';
import {toast} from 'react-toastify';
import {Inject} from 'react.di';
import {GallerySectionsHttpService} from '../gallery-sections/GallerySectionsHttpService';
import {GalleryItemsHttpService} from './GalleryItemsHttpService';
import {GalleryItemsService} from './GalleryItemsService';
import {Subscription} from 'rxjs';

const LIMIT = 6;

interface GalleryItemsContainerProps {
  sectionId: number;
  itemsRender: (props: ItemRenderProps) => React.ReactNode[];
}

interface GalleryItemsContainerState {
  items: any[];
  hasMoreItems: boolean;
}

interface ItemRenderProps {
  items: any[];
  onDeleteItem(item: any);
  onLoadMore(offset: number);
}

export class GalleryItemsContainer extends Component<GalleryItemsContainerProps, GalleryItemsContainerState> {

  @Inject gallerySectionsHttpService: GallerySectionsHttpService;
  @Inject galleryItemsHttpService: GalleryItemsHttpService;
  @Inject galleryItemsService: GalleryItemsService;

  private itemsSubscription: Subscription;
  private hasMoreItemsSubscription: Subscription;

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      hasMoreItems: true,
    };
  }

  componentWillMount(): void {
    const {sectionId} = this.props;
    this.galleryItemsService.initialize(sectionId);
  }

  async componentDidMount() {
    this.itemsSubscription =
      this.galleryItemsService.items.subscribe(items => this.setState({items}));
    this.hasMoreItemsSubscription =
      this.galleryItemsService.hasMoreItems.subscribe(hasMoreItems => this.setState({hasMoreItems}));
  }

  componentWillUnmount(): void {
    this.itemsSubscription.unsubscribe();
    this.hasMoreItemsSubscription.unsubscribe();
  }

  async loadItems() {
    await this.processAction(() => this.galleryItemsService.loadItems());
  }

  async deleteItem(itemToDelete) {
    const {items} = this.state;
    this.setState({
      items: items.filter(item => item !== itemToDelete),
    });
    await this.galleryItemsHttpService.deleteGalleryItem(itemToDelete);
  }

  async processAction(action) {
    try {
      await action();
    } catch (e) {
      toast.error(<p>Es ist ein Fehler aufgetreten. Bitte versuche es erneut.{e.toString()}</p>);
    }
  }

  render() {
    const {itemsRender} = this.props;
    const {hasMoreItems, items} = this.state;
    return (
      <InfiniteScroll loadMore={() => this.loadItems()}
                      limit={LIMIT}
                      hasMore={hasMoreItems}
                      loader={<div className="loader" style={{float: 'left'}} key={0}>Loading ...</div>}>
        {itemsRender({
          items,
          onLoadMore: () => this.loadItems(),
          onDeleteItem: item => this.deleteItem(item)
        })}
      </InfiniteScroll>
    );
  }

}
