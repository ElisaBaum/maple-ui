import {Inject, Injectable} from 'react.di';
import {Http} from '../../http/Http';

@Injectable
export class GalleryItemsHttpService {

  constructor(@Inject private http: Http) {
  }

  getGalleryItemS3Policy(key: string, contentType: string) {
    return this.http.get<any>('/users/me/gallery-item-s3-policy', {
      params: {key, contentType}
    });
  }

  createGalleryItem(createGalleryItemDTO) {
    return this.http.post<any>('/users/me/gallery-items', createGalleryItemDTO);
  }

  deleteGalleryItem(item) {
    return this.http.delete<any>(`/users/me/gallery-items/${item.id}`);
  }

}
