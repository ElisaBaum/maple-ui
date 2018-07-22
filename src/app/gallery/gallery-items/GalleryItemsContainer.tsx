import * as React from 'react';
import {Component} from 'react';
import {InfiniteScroll} from '../../layout/components/infinite-scroll/InfiniteScroll';
import {toast} from 'react-toastify';
import {Inject} from 'react.di';
import {GallerySectionsHttpService} from '../gallery-sections/GallerySectionsHttpService';
import {GalleryItemsHttpService} from './GalleryItemsHttpService';

const LIMIT = 6;

interface GalleryItemsContainerProps {
  sectionId: string;
  itemsRender: (props: ItemRenderProps) => React.ReactNode[];
}

interface GalleryItemsContainerState {
  items: any[];
  hasMoreItems: boolean;
}

interface ItemRenderProps {
  items: any[];
  onDeleteItem(item: any);
}

export class GalleryItemsContainer extends Component<GalleryItemsContainerProps, GalleryItemsContainerState> {

  @Inject gallerySectionsHttpService: GallerySectionsHttpService;
  @Inject galleryItemsHttpService: GalleryItemsHttpService;

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      hasMoreItems: true,
    };
  }

  async componentDidMount() {
  }

  async loadItems(offset = 0) {
    await this.processAction(async () => {
      const {data, headers} = await this.gallerySectionsHttpService.getGalleryItemsBySection(
        this.props.sectionId,
        LIMIT,
        offset,
      );
      this.setState({
        items: [...this.state.items, ...data],
        hasMoreItems: offset < parseFloat(headers['x-total-count']),
      });
    });
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
      <InfiniteScroll loadMore={offset => this.loadItems(offset)}
                      limit={LIMIT}
                      hasMore={hasMoreItems}
                      loader={<div className="loader" key={0}>Loading ...</div>}>
        {itemsRender({items, onDeleteItem: item => this.deleteItem(item)})}
      </InfiniteScroll>
    );
  }

}
