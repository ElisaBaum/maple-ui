import * as React from 'react';
import './ContentContainer.scss';

interface ContentContainerProps {
  headline: string;
  headlineIcon: string;
  children: any;
}

export function ContentContainer({headline, headlineIcon, children}: ContentContainerProps) {
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

