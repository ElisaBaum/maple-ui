import * as React from 'react';
import * as classNames from 'classnames';
import {HTMLAttributes} from 'react';
import './Icon.scss';

interface IconProps extends HTMLAttributes<{}> {
  name: string;
  size?: 'lg';
  inverse?: boolean;
}

export function Icon({name, size, className, inverse, ...props}: IconProps) {
  return (<i {...props}
             className={classNames('er-icon', 'material-icons', size, {inverse})}>{name}</i>);
}
