import * as React from 'react';
import * as classnames from 'classnames';
import {Icon} from '../icon/Icon';
import './Headline.scss';

interface HeadlineProps {
  text: string;
  icon?: string;
  sub?: boolean;
  className?: string;
}

export function Headline({text, icon, sub, className}: HeadlineProps) {
  return (
    <h3 className={classnames('headline', className, {'headline-sub': sub})}>
      {
        icon &&
        <Icon name={icon}/>
      }
      {text}
    </h3>
  );
}
