import {Module} from 'react.di';
import {GallerySectionsHttpService} from './gallery-sections/GallerySectionsHttpService';
import {GalleryItemsHttpService} from './gallery-items/GalleryItemsHttpService';
import {GalleryItemsService} from './gallery-items/GalleryItemsService';

@Module({
  providers: [
    GallerySectionsHttpService,
    GalleryItemsHttpService,
    GalleryItemsService,
  ],
})
export class GalleryModule {

}
