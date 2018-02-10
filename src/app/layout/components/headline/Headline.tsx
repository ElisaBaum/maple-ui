import * as React from 'react';
import * as classnames from 'classnames';
import './Headline.scss';
import {Icon} from '../icon/Icon';

interface HeadlineProps {
  text: string;
  icon?: string;
  className?: string;
}

export function Headline({text, icon, className}: HeadlineProps) {
  return (
    <h3 className={classnames('headline', className)}>
      {
        icon &&
        <Icon name={icon}/>
      }
      {text}
    </h3>
  );
}
