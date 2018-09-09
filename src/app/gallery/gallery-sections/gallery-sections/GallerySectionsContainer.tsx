import * as React from 'react';
import {Component} from 'react';
import {GallerySections} from './GallerySections';
import {Inject} from 'react.di';
import {GallerySectionsHttpService} from '../GallerySectionsHttpService';
import {toast} from 'react-toastify';
import {UserService} from '../../../user/UserService';
import {RouteComponentProps} from 'react-router';
import {User} from '../../../user/User';
import {ContentComponentProps} from '../../../dynamic-content/ContentContainer';
import {displayUnseenHints} from '../../hints';

interface GallerySectionsContainerProps extends RouteComponentProps<any>, ContentComponentProps<any> {

}

interface GallerySectionsContainerState {
  sections: any[];
  user?: User;
}

export class GallerySectionsContainer extends Component<GallerySectionsContainerProps, GallerySectionsContainerState> {

  @Inject gallerySectionsHttpService: GallerySectionsHttpService;
  @Inject userService: UserService;

  constructor(props) {
    super(props);
    this.state = {
      sections: [],
    };
  }

  async componentDidMount() {
    this.setState({user: this.userService.getUser()});
    await this.loadSections();
    this.initializeHints();
  }

  async loadSections() {
    await this.processAction(async () => {
      const {data} = await this.gallerySectionsHttpService.getGallerySections();
      this.setState({
        sections: data,
      });
    });
  }

  async createGallerySectionAndRouteToIt() {
    await this.processAction(async () => {
      const {data} = await this.gallerySectionsHttpService.createGallerySection({name: this.generateNewGalleryName()});
      this.props.history.push(`/gallery/sections/${data.id}/edit`);
    });
  }

  async deleteGallerySection(section) {
    await this.processAction(async () => {
      await this.gallerySectionsHttpService.deleteGallerySection(section);
      await this.loadSections();
    });
  }

  async processAction(action) {
    try {
      await action();
    } catch (e) {
      toast.error(<p>Es ist ein Fehler aufgetreten. Bitte versuche es erneut.</p>);
    }
  }

  generateNewGalleryName() {
    const {user, sections} = this.state;
    if (user) {
      return `${user.name}'s Gallerie #${sections.length}`;
    }
    return `Deine Gallerie #${sections.length}`;
  }

  initializeHints() {
    const scrollListener = () => {
      displayUnseenHints(this.props.content.gallerySections.hints);
      document.removeEventListener('scroll', scrollListener);
    };
    document.addEventListener('scroll', scrollListener);
  }

  render() {
    const {content} = this.props;
    const {user, sections} = this.state;

    if (!user) {
      return (<div></div>);
    }

    return (
      <GallerySections sections={sections}
                       user={user}
                       content={content}
                       onCreateSection={() => this.createGallerySectionAndRouteToIt()}
                       onDeleteSection={section => this.deleteGallerySection(section)}/>
    );
  }
}
