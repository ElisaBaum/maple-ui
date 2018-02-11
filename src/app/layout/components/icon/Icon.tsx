import * as React from 'react';
import * as classNames from 'classnames';
import {HTMLAttributes} from 'react';
import './Icon.scss';

interface IconProps extends HTMLAttributes<{}> {
  name: string;
  size?: 'lg';
}

export function Icon({name, size, className, ...props}: IconProps) {
  return (<i {...props}
             className={classNames('er-icon', 'material-icons', size)}>{name}</i>);
}
