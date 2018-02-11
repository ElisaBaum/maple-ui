import * as React from 'react';
import * as classnames from 'classnames';
import {Icon} from '../icon/Icon';
import './Headline.scss';

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
