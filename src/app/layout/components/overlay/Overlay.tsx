import * as React from 'react';
import * as classnames from 'classnames';
import './Overlay.scss';

export interface OverlayOptions {
  light?: boolean;
  className?: string;
}

export interface OverlayProps extends OverlayOptions {
  children: any | any[];
}

export const Overlay = ({children, light, className}: OverlayProps) => (
  <div className={classnames('overlay', {'overlay-light': light}, className)}>
    {children}
  </div>
);
