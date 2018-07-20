import {Inject, Injectable} from 'react.di';
import {Http} from '../../http/Http';

@Injectable
export class GallerySectionsHttpService {

  constructor(@Inject private http: Http) {
  }

  getGallerySections() {
    return this.http.get<any[]>('/gallery-sections');
  }

  getGalleryItemsBySection(sectionId) {
    return this.http.get<any[]>(`/users/me/gallery-sections/${sectionId}/gallery-items`);
  }

  getGallerySection(sectionId) {
    return this.http.get<any[]>(`/gallery-sections/${sectionId}`);
  }

  createGallerySection(section) {
    return this.http.post<any[]>('/users/me/gallery-sections', section);
  }

  deleteGallerySection(section) {
    return this.http.delete<any[]>(`/users/me/gallery-sections/${section.id}`);
  }

}
