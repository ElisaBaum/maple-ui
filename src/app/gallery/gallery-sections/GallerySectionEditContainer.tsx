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

  async deleteItem(itemToDelete) {
    const {items} = this.state;
    this.setState({
      items: items.filter(item => item !== itemToDelete)
    });
    await this.galleryItemsHttpService.deleteGalleryItem(itemToDelete);
  }

  async processUpload(fileList: FileList) {
    const {items} = this.state;
    this.setState({
      items: [
        ...Array
          .from(fileList)
          .map(file => ({
            file,
            progress: 0,
            originalName: file.name,
            isNew: true,
          })),
        ...items,
      ],
    });

    await this.uploadFiles(fileList, (event: ProgressEvent, _file) => this.setState({
      items: this.state.items.map(({file, progress, ...rest}) => {
        if (file === _file) {
          progress = event.loaded / event.total;
        }
        return ({progress, file, ...rest});
      }),
    }));
  }

  async uploadFiles(fileList: FileList, onProgress) {
    const {section} = this.state;
    await this.processAction(async () => {
      await Array.from(fileList).reduce(async (promise, file) => {
        await promise;
        const {data} = await this.galleryItemsHttpService.getGalleryItemS3Policy(file.name, file.type);
        await this.s3UploadService.uploadFile(file, data, onProgress);
        await this.galleryItemsHttpService.createGalleryItem({
          key: data.key,
          originalName: file.name,
          resizedKey: data.resizedKey,
          type: file.type,
          sectionId: section.id,
          access: 'All',
          lastModifiedAt: file.lastModifiedDate,
        });
      }, Promise.resolve());
    });
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
                            onUpload={fileList => this.processUpload(fileList)}
                            section={section}
                            items={items}/>
      );
    }
    return (<div></div>);
  }
}
