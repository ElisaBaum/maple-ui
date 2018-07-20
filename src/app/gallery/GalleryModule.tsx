import * as React from 'react';
import {Route, Switch} from 'react-router';
import {Component} from 'react';
import {Module} from 'react.di';
import {GallerySectionsHttpService} from './gallery-sections/GallerySectionsHttpService';
import {GallerySectionsContainer} from './gallery-sections/GallerySectionsContainer';
import {Headline} from '../layout/components/headline/Headline';
import {GallerySectionContainer} from './gallery-sections/GallerySectionContainer';
import {GalleryItemsHttpService} from './gallery-items/GalleryItemsHttpService';

@Module({
  providers: [
    GallerySectionsHttpService,
    GalleryItemsHttpService,
  ],
})
export class GalleryModule extends Component {

  render() {
    return (
      <div style={{backgroundColor: '#f2f2f2'}}>
        <Headline text={'Gallery'}/>
        <Switch>
          <Route path={'/gallery/sections/:id'} component={GallerySectionContainer}/>
          <Route path={'/gallery/sections'} component={GallerySectionsContainer}/>
          <Route component={GallerySectionsContainer}/>
        </Switch>
      </div>
    );
  }
}
