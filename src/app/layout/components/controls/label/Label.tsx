import * as React from 'react';
import * as classnames from "classnames";
import './Label.scss';

interface LabelProps {
  children?: any;
  floated?: boolean;
  error?: boolean;
}

export function Label({children, floated, error}: LabelProps) {
  return (<span className={classnames('label', {floated, error})}>
    {children}
    </span>);
}
