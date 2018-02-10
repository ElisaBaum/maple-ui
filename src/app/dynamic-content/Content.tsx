import * as React from 'react';
import * as classNames from 'classnames';
import './Content.scss';
import {FadeIn} from '../layout/components/fade-in/FadeIn';

interface ContentProps {
  header: {
    title: string;
    image: string;
  };
  children: any;
  className?: string;
  style?: any;
  isNavOpen?: boolean;
}

export function Content({header, children, className, style}, isNavOpen: ContentProps) {
  return (
    <div className={classNames('content', {'nav-open': isNavOpen}, className)} style={style}>
      <div className={'header'}>
        <FadeIn whenLoaded>
          <img className={'header-img'} src={header.image}/>
        </FadeIn>
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

