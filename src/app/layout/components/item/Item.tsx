import * as React from 'react';
import * as classNames from 'classnames';
import {HTMLAttributes} from 'react';
import {Link} from 'react-router-dom';
import './Item.scss';

interface ItemProps extends HTMLAttributes<{}> {
  children: any | any[];
  className?: string;
  border?: boolean;
}

const itemClassNames = ({className, border}) => classNames('item', className, {'no-border': !border});

export function Item({children, className, border, ...props}: ItemProps) {
  border = border === undefined;
  return (
    <div {...props} className={itemClassNames({className, border})}>{children}</div>
  );
}

interface LinkItemProps extends ItemProps {
  target: string;
}

export function LinkItem({children, className, border, target}: LinkItemProps) {
  border = border === undefined;
  return (
    <Link to={target}
          className={itemClassNames({className: classNames(className, 'link-item'), border})}>
      {children}
    </Link>
  );
}
