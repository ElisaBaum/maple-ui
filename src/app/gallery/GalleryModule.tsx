import * as React from 'react';
import {Component} from 'react';
import {Route, Switch} from 'react-router';
import {Module} from 'react.di';
import {GallerySectionsHttpService} from './gallery-sections/GallerySectionsHttpService';
import {GallerySectionsContainer} from './gallery-sections/GallerySectionsContainer';
import {Headline} from '../layout/components/headline/Headline';
import {GalleryItemsHttpService} from './gallery-items/GalleryItemsHttpService';
import {GallerySectionEditContainer} from './gallery-sections/GallerySectionEditContainer';

@Module({
  providers: [
    GallerySectionsHttpService,
    GalleryItemsHttpService,
  ],
})
export class GalleryModule extends Component {

  render() {
    return (
      <div style={{backgroundColor: 'white'}}>
        <Headline text={'Gallery'}/>
        <Switch>
          <Route path={'/gallery/sections/:id'} component={GallerySectionEditContainer}/>
          <Route path={'/gallery/sections'} component={GallerySectionsContainer}/>
          <Route component={GallerySectionsContainer}/>
        </Switch>
      </div>
    );
  }
}
