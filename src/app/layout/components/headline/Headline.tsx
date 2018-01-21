import * as React from 'react';
import './Headline.scss';

interface HeadlineProps {
  text: string;
  icon?: string;
}

export function Headline({text, icon}: HeadlineProps) {
  return (
    <div className={'headline'}>
      {
        icon &&
        <i className="material-icons">{icon}</i>
      }
      {text}
    </div>
  );
}
