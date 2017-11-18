import * as React from 'react';
import './Content.scss';

interface ContentProps {
  headline: string;
  headlineIcon: string;
  children: any;
}

export function Content({headline, headlineIcon, children}: ContentProps) {
  return (
    <div className={'content-container'}>
      <div className={'headline'}>
        <i className={'material-icons'}>{headlineIcon}</i>
        {headline}
      </div>
      <div className={'content'}>
        {...children}
      </div>
    </div>
  );
}

