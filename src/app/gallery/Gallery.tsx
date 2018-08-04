import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {GallerySectionEditContainer} from './gallery-sections/gallery-section-edit/GallerySectionEditContainer';
import {GallerySectionContainer} from './gallery-sections/gallery-section/GallerySectionContainer';
import {GallerySectionsContainer} from './gallery-sections/gallery-sections/GallerySectionsContainer';
import './Gallery.scss';
import {ContentContainer} from '../dynamic-content/ContentContainer';

export const Gallery = () => (
  <div className={'gallery'}>
    <Switch>
      <Route path={'/gallery/sections/:id/edit'}
             render={routeProps => (
               <ContentContainer
                 contentKey={'gallery'}
                 render={() => <GallerySectionEditContainer {...routeProps} />}/>
             )}/>
      <Route path={'/gallery/sections/:id'}
             component={GallerySectionContainer}/>
      <Route path={'/gallery/sections'}
             render={routeProps => (
               <ContentContainer
                 contentKey={'gallery'}
                 render={() => <GallerySectionsContainer {...routeProps} />}/>
             )}/>
      <Route render={() => (<Redirect to={'/gallery/sections'}/>)}/>
    </Switch>
  </div>
);
