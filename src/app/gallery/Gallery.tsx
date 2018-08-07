import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {GallerySectionEditContainer} from './gallery-sections/gallery-section-edit/GallerySectionEditContainer';
import {GallerySectionContainer} from './gallery-sections/gallery-section/GallerySectionContainer';
import {GallerySectionsContainer} from './gallery-sections/gallery-sections/GallerySectionsContainer';
import {ContentContainer} from '../dynamic-content/ContentContainer';
import './Gallery.scss';

export const GALLERY_SECTION_EDIT = (id = ':id') => `/gallery/sections/${id}/edit`;
export const GALLERY_SECTION = (id = ':id') => `/gallery/sections/${id}`;
export const GALLERY_SECTIONS = `/gallery/sections`;

export const Gallery = () => (
  <div className={'gallery'}>
    <Switch>
      <Route path={GALLERY_SECTION_EDIT()}
             render={routeProps => (
               <ContentContainer
                 contentKey={'gallery'}
                 render={() => <GallerySectionEditContainer {...routeProps} />}/>
             )}/>
      <Route path={GALLERY_SECTION()}
             component={GallerySectionContainer}/>
      <Route path={GALLERY_SECTIONS}
             render={routeProps => (
               <ContentContainer
                 contentKey={'gallery'}
                 render={() => <GallerySectionsContainer {...routeProps} />}/>
             )}/>
      <Route render={() => (<Redirect to={GALLERY_SECTIONS}/>)}/>
    </Switch>
  </div>
);
