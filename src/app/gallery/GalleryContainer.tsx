import * as React from 'react';
import './Gallery.scss';
import {ContentContainer} from '../dynamic-content/ContentContainer';
import {Gallery} from './Gallery';

export const GalleryContainer = () => (
  <ContentContainer contentKey={'gallery'}
                    render={() => (<Gallery/>)}/>
);
