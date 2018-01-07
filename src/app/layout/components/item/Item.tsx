import * as React from 'react';
import './Item.scss';

export function Item({children}) {
  return (<div className={'item'}>{children}</div>);
}
