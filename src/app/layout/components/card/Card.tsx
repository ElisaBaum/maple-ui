import * as React from 'react';
import * as classNames from 'classnames';
import './Card.scss';

interface CardProps {
  children: any | any[];
  className?: string;
}

export function Card({children, className}: CardProps) {
  return (
    <div className={classNames('card', className)}
         style={{position: 'relative'}}>
      {children}
    </div>
  );
}
