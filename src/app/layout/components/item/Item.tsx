import * as React from 'react';
import * as classnames from 'classnames';
import {HTMLAttributes} from 'react';
import './Item.scss';

interface ItemProps extends HTMLAttributes<{}> {
  children: any | any[];
  className?: string;
  border?: boolean;
}

export function Item({children, className, border, ...props}: ItemProps) {
  border = border === undefined;
  return (
    <div {...props}
         className={classnames('item', className, {'no-border': !border})}>{children}</div>
  );
}
