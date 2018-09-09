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
  zipping?: boolean;
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
    await this.processAction(async () => {
      try {
        this.setState({
          zipping: true,
        });

        const {section} = this.state;
        const {data} = await this.gallerySectionsHttpService.zipGallerySection(section);

        const element = document.createElement('a');
        element.setAttribute('href', data);
        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      } catch (e) {
        throw e;
      } finally {
        this.setState({
          zipping: false,
        });
      }
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
    const {section, zipping} = this.state;
    if (section) {
      return (
        <GallerySection section={section} download={() => this.downloadSection()} zipping={zipping}/>
      );
    }
    return (<div></div>);
  }
}
