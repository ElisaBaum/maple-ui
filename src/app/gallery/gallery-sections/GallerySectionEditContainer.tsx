import * as React from 'react';
import {Component} from 'react';
import {Inject} from 'react.di';
import {GallerySectionsHttpService} from './GallerySectionsHttpService';
import {toast} from 'react-toastify';
import {UserService} from '../../user/UserService';
import {S3UploadService} from '../../common/S3UploadService';
import {GallerySectionEdit} from './GallerySectionEdit';
import {GalleryItemsHttpService} from '../gallery-items/GalleryItemsHttpService';
import {GalleryItem} from '../gallery-items/GalleryItem';
import {RouteComponentProps} from 'react-router';
import {NewGalleryItem} from '../gallery-items/NewGalleryItem';

interface GallerySectionEditContainerState {
  section?: any;
  items: GalleryItem[];
  user?;
}

interface GallerySectionEditContainerProps extends RouteComponentProps<any> {
}

export class GallerySectionEditContainer extends Component<GallerySectionEditContainerProps, GallerySectionEditContainerState> {

  @Inject gallerySectionsHttpService: GallerySectionsHttpService;
  @Inject galleryItemsHttpService: GalleryItemsHttpService;
  @Inject s3UploadService: S3UploadService;
  @Inject userService: UserService;

  updateSectionTimeoutId;
  cancelUpdateSectionRequest;

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  async componentDidMount() {
    this.setState({user: this.userService.getUser()});
    await Promise.all([
      this.loadSection(),
      this.loadItems(),
    ]);
  }

  async loadSection() {
    await this.processAction(async () => {
      const {data} = await this.gallerySectionsHttpService.getGallerySection(this.props.match.params.id);
      this.setState({
        section: data,
      });
    });
  }

  async loadItems() {
    await this.processAction(async () => {
      const {data} = await this.gallerySectionsHttpService.getGalleryItemsBySection(this.props.match.params.id);
      this.setState({
        items: data,
      });
    });
  }

  async updateSection(sectionToUpdate) {
    const {section} = this.state;
    const DELAY = 800;
    if (this.updateSectionTimeoutId) clearTimeout(this.updateSectionTimeoutId);
    if (this.cancelUpdateSectionRequest) this.cancelUpdateSectionRequest();
    this.updateSectionTimeoutId = setTimeout(async () => {
      await this.gallerySectionsHttpService.updateGallerySectionPartially(
        {...section, ...sectionToUpdate},
        cancel => this.cancelUpdateSectionRequest = cancel,
      );
    }, DELAY);
  }

  async deleteItem(itemToDelete) {
    const {items} = this.state;
    this.setState({
      items: items.filter(item => item !== itemToDelete),
    });
    await this.galleryItemsHttpService.deleteGalleryItem(itemToDelete);
  }

  async processUpload(fileList: FileList) {
    const {items} = this.state;
    const newItems = this.getNewItemsByFileList(fileList);

    this.setState({items: [...newItems, ...items]});

    await this.uploadItems(
      newItems,
      (event: ProgressEvent, _file) => this.setState({
        items: this.state.items.map(({file, progress, ...rest}) => {
          if (file === _file) {
            progress = event.loaded / event.total;
          }
          return ({progress, file, ...rest});
        }),
      }),
      (completedItem) => this.setState({
        items: this.state.items.map(({completed, ...item}) => {
          if (item.file === completedItem.file) {
            completed = true;
          }
          return ({completed, ...item});
        }),
      })
    );
  }

  async uploadItems(newItems: NewGalleryItem[], onFileProgress, onItemComplete) {
    const {section} = this.state;
    await this.processAction(async () => {
      await newItems.reduce(async (promise, item) => {
        const file = item.file;
        await promise;
        const {data} = await this.galleryItemsHttpService.getGalleryItemS3Policy(file.name, file.type);
        await this.s3UploadService.uploadFile(file, data, onFileProgress);
        await this.galleryItemsHttpService.createGalleryItem({
          key: data.key,
          originalName: file.name,
          resizedKey: data.resizedKey,
          type: file.type,
          sectionId: section.id,
          access: 'All',
          lastModifiedAt: file.lastModifiedDate,
        });
        onItemComplete(item);
      }, Promise.resolve());
    });
  }

  getNewItemsByFileList(fileList: FileList): NewGalleryItem[] {
    return Array.from(fileList).map(file => ({
        file,
        progress: 0,
        originalName: file.name,
        isNew: true,
      }),
    );
  }

  async processAction(action) {
    try {
      await action();
    } catch (e) {
      toast.error(<p>Es ist ein Fehler aufgetreten. Bitte versuche es erneut.{e.toString()}</p>);
    }
  }

  render() {
    const {section, items} = this.state;
    if (section) {
      return (
        <GallerySectionEdit onDeleteItem={item => this.deleteItem(item)}
                            onSectionChange={(sectionToUpdate) => this.updateSection(sectionToUpdate)}
                            onUpload={fileList => this.processUpload(fileList)}
                            section={section}
                            items={items}/>
      );
    }
    return (<div></div>);
  }
}
