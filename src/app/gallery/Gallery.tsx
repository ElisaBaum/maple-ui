import {Headline} from '../layout/components/headline/Headline';
import {Route, Switch} from 'react-router';
import {GallerySectionEditContainer} from './gallery-sections/gallery-section-edit/GallerySectionEditContainer';
import {GallerySectionContainer} from './gallery-sections/gallery-section/GallerySectionContainer';
import {GallerySectionsContainer} from './gallery-sections/GallerySectionsContainer';
import * as React from 'react';

export const Gallery = () => (
  <div style={{backgroundColor: 'white'}}>
    <Headline text={'Gallery'}/>
    <Switch>
      <Route path={'/gallery/sections/:id/edit'} component={GallerySectionEditContainer}/>
      <Route path={'/gallery/sections/:id'} component={GallerySectionContainer}/>
      <Route path={'/gallery/sections'} component={GallerySectionsContainer}/>
      <Route component={GallerySectionsContainer}/>
    </Switch>
  </div>
);
