import * as React from 'react';
import {Component} from 'react';
import {Inject} from 'react.di';
import {GallerySectionsHttpService} from './GallerySectionsHttpService';
import {toast} from 'react-toastify';
import {UserService} from '../../user/UserService';
import {GallerySection} from './GallerySection';
import {GalleryItemsHttpService} from '../gallery-items/GalleryItemsHttpService';
import {S3UploadService} from '../../common/S3UploadService';

export class GallerySectionContainer extends Component<{ match }, { section?: any, items: any[], user? }> {

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

  async processAction(action) {
    try {
      await action();
    } catch (e) {
      toast.error(<p>Es ist ein Fehler aufgetreten. Bitte versuche es erneut.{e.toString()}</p>);
    }
  }

  async processUpload(fileList: FileList) {
    await this.processAction(async () => {
      await Array.from(fileList).reduce(async (promise, file) => {
        await promise;
        const {data} = await this.galleryItemsHttpService.getGalleryItemS3Policy(file.name, file.type);
        await this.s3UploadService.uploadFile(file, data);
        await this.galleryItemsHttpService.createGalleryItem({
          key: data.key,
          resizedKey: data.resizedKey,
          type: file.type,
          sectionId: this.state.section.id,
          access: 'All',
          lastModifiedAt: file.lastModifiedDate,
        });
      }, Promise.resolve());
      await this.loadItems();
    });
  }

  render() {
    const {section, items} = this.state;

    if (section) {
      return (
        <GallerySection onUpload={files => this.processUpload(files)}
                        section={section}
                        items={items}/>
      );
    }
    return (<div></div>);
  }
}
