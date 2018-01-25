import * as React from 'react';
import * as classnames from 'classnames';
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
        <i className="material-icons">{icon}</i>
      }
      {text}
    </h3>
  );
}
