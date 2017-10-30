import * as React from 'react';
import './center.scss';

export const center = (Component, width = '300px') => (
  <div className={'center'}>
    <div className={'centered-component'} style={{width}}>
      <Component/>
    </div>
  </div>
);
