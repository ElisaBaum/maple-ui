import * as React from 'react';
import './Content.scss';

interface ContentProps {
  header: {
    title: string;
    image: string;
  };
  children: any;
}

export function Content({header, children}: ContentProps) {
  return (
    <div className={'content'}>
      <div className={'header'}>
        <img className={'header-img'} src={header.image} />
        <div className={'header-text'}>
          {header.title}
        </div>
      </div>
      <div className={'content-content'}>
        {...children}
      </div>
    </div>
  );
}

