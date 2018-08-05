import * as React from 'react';
import {Component} from 'react';
import {Inject} from 'react.di';
import {GallerySectionsHttpService} from '../GallerySectionsHttpService';
import {toast} from 'react-toastify';
import {S3UploadService} from '../../../common/S3UploadService';
import {GalleryItemsHttpService} from '../../gallery-items/GalleryItemsHttpService';
import {RouteComponentProps} from 'react-router';
import {GallerySection} from './GallerySection';

interface GallerySectionContainerState {
  section?: any;
}

interface GallerySectionContainerProps extends RouteComponentProps<any> {
}

export class GallerySectionContainer extends Component<GallerySectionContainerProps, GallerySectionContainerState> {

  @Inject gallerySectionsHttpService: GallerySectionsHttpService;
  @Inject galleryItemsHttpService: GalleryItemsHttpService;
  @Inject s3UploadService: S3UploadService;

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    await this.loadSection();
  }

  async loadSection() {
    await this.processAction(async () => {
      const {data} = await this.gallerySectionsHttpService.getGallerySection(this.props.match.params.id);
      this.setState({
        section: data,
      });
    });
  }

  async downloadSection() {
    const {section} = this.state;
    this.gallerySectionsHttpService.zipGallerySection(section);
  }

  async processAction(action) {
    try {
      await action();
    } catch (e) {
      toast.error(<p>Es ist ein Fehler aufgetreten. Bitte versuche es erneut.{e.toString()}</p>);
    }
  }

  render() {
    const {section} = this.state;
    if (section) {
      return (
        <GallerySection section={section} download={() => this.downloadSection()}/>
      );
    }
    return (<div></div>);
  }
}
