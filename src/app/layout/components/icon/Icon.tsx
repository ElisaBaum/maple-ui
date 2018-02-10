import * as React from 'react';
import * as classNames from 'classnames';
import './Icon.scss';
import {HTMLAttributes} from 'react';

interface IconProps extends HTMLAttributes<{}> {
  name: string;
}

export function Icon({name, className, ...props}: IconProps) {
  return (<i {...props}
             className={classNames('er-icon', 'material-icons')}>{name}</i>);
}
