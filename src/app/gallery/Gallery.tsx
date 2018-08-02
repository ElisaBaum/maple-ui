import * as React from 'react';
import {Route, Switch} from 'react-router';
import {GallerySectionEditContainer} from './gallery-sections/gallery-section-edit/GallerySectionEditContainer';
import {GallerySectionContainer} from './gallery-sections/gallery-section/GallerySectionContainer';
import {GallerySectionsContainer} from './gallery-sections/gallery-sections/GallerySectionsContainer';
import './Gallery.scss';

export const Gallery = () => (
  <div className={'gallery'}>
    <Switch>
      <Route path={'/gallery/sections/:id/edit'} component={GallerySectionEditContainer}/>
      <Route path={'/gallery/sections/:id'} component={GallerySectionContainer}/>
      <Route path={'/gallery/sections'} component={GallerySectionsContainer}/>
      <Route component={GallerySectionsContainer}/>
    </Switch>
  </div>
);
