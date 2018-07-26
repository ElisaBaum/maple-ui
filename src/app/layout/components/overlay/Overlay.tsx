import * as React from 'react';
import './Overlay.scss';

export const Overlay = ({children}) => (
  <div className={'overlay'}>
    {children}
  </div>
);
