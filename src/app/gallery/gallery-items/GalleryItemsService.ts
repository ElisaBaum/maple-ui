import {Inject, Injectable} from 'react.di';
import {GallerySectionsHttpService} from '../gallery-sections/GallerySectionsHttpService';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

const LIMIT = 6;

@Injectable
export class GalleryItemsService {

  items: Observable<any[]>;
  hasMoreItems: Observable<boolean>;

  private itemsSubject: BehaviorSubject<any[]>;
  private hasMoreItemsSubject: BehaviorSubject<boolean>;
  private sectionId: number;
  private previousPromise = Promise.resolve();

  constructor(@Inject private gallerySectionsHttpService: GallerySectionsHttpService) {
  }

  initialize(sectionId: number) {
    this.sectionId = sectionId;
    this.itemsSubject = new BehaviorSubject<any[]>([]);
    this.items = this.itemsSubject.asObservable();
    this.hasMoreItemsSubject = new BehaviorSubject<boolean>(true);
    this.hasMoreItems = this.hasMoreItemsSubject.asObservable();
  }

  async loadItems() {
    if (this.hasMoreItemsSubject.getValue()) {
      await this.previousPromise;
      this.previousPromise = this._loadItems();
      await this.previousPromise;
    }
  }

  private async _loadItems() {
    const items = this.itemsSubject.getValue();
    const {data, headers} = await this.gallerySectionsHttpService.getGalleryItemsBySection(
      this.sectionId,
      LIMIT,
      items.length,
    );
    const newItems = [...items, ...data];
    this.itemsSubject.next(newItems);
    this.hasMoreItemsSubject.next(newItems.length < parseFloat(headers['x-total-count']));
    this.previousPromise = Promise.resolve();
  }

}
