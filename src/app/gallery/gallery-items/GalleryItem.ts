
export interface GalleryItem {
  id?: number;
  originalName: string;
  originalUrl?: string;
  resizedUrl?: string;
  lastModifiedAt?: string;
  title?: string;
  progress?: number;
  completed?: boolean;
  isNew?: boolean;
  file?: File;
}
