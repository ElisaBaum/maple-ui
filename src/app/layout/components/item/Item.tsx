import * as React from 'react';
import * as classnames from 'classnames';
import './Item.scss';

interface ItemProps {
  children: any | any[];
  className?: string;
}

export function Item({children, className}: ItemProps) {
  return (
    <div className={classnames('item', className)}>{children}</div>
  );
}
