import * as React from 'react';
import {Component} from 'react';
import {GallerySections} from './GallerySections';
import {Inject} from 'react.di';
import {GallerySectionsHttpService} from './GallerySectionsHttpService';
import {toast} from 'react-toastify';
import {GallerySectionEdit} from './GallerySectionEdit';
import {Card} from '../../layout/components/card/Card';
import {UserService} from '../../user/UserService';

export class GallerySectionsContainer extends Component<{}, { sections: any[], newSection: any, user? }> {

  @Inject gallerySectionsHttpService: GallerySectionsHttpService;
  @Inject userService: UserService;

  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      newSection: {name: 'string'},
    };
  }

  async componentDidMount() {
    this.setState({user: this.userService.getUser()});
    await this.loadSections();
  }

  async loadSections() {
    await this.processAction(async () => {
      const {data} = await this.gallerySectionsHttpService.getGallerySections();
      this.setState({
        sections: data,
      });
    });
  }

  async createGallerySection(section) {
    await this.processAction(async () => {
      await this.gallerySectionsHttpService.createGallerySection(section);
      await this.loadSections();
      this.setState({newSection: {name: ''}});
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

  render() {
    const {user, sections, newSection} = this.state;
    return (
      <div>
        <Card>
          <GallerySectionEdit section={newSection}
                              onCreateSection={section => this.createGallerySection(section)}/>
        </Card>
        <Card>
          <GallerySections sections={sections}
                           user={user}
                           onDeleteSection={section => this.deleteGallerySection(section)}/>
        </Card>
      </div>
    );
  }
}
