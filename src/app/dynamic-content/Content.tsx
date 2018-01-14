import * as React from 'react';
import * as headerImg from './IMG_9247.jpg';
import './Content.scss';

interface ContentProps {
  headline: string;
  headlineIcon: string;
  children: any;
}

export function Content({headline, headlineIcon, children}: ContentProps) {
  return (
    <div className={'content'}>
      <div className={'header'}>
        <img className={'header-img'} src={headerImg} />
        <div className={'header-text'}>
          Bist du dabei?
        </div>
      </div>
      <div className={'content-content'}>
        {...children}
      </div>
    </div>
  );
}

