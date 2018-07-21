import {Inject, Injectable} from 'react.di';
import {Http} from '../../http/Http';
import axios from 'axios';

@Injectable
export class GallerySectionsHttpService {

  constructor(@Inject private http: Http) {
  }

  getGallerySections() {
    return this.http.get<any[]>('/gallery-sections');
  }

  getGalleryItemsBySection(sectionId, limit, offset) {
    return this.http.get<any[]>(`/users/me/gallery-sections/${sectionId}/gallery-items`, {
      params: {limit, offset}
    });
  }

  getGallerySection(sectionId) {
    return this.http.get<any[]>(`/gallery-sections/${sectionId}`);
  }

  createGallerySection(section) {
    return this.http.post<any>('/users/me/gallery-sections', section);
  }

  updateGallerySectionPartially(section, onGetCancel) {
    return this.http.patch<any>(`/users/me/gallery-sections/${section.id}`, section, {
      cancelToken: onGetCancel && new axios.CancelToken(onGetCancel)
    });
  }

  deleteGallerySection(section) {
    return this.http.delete<any[]>(`/users/me/gallery-sections/${section.id}`);
  }

}
