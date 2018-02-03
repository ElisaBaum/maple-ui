import * as React from 'react';
import * as classnames from 'classnames';
import './Content.scss';

interface ContentProps {
  header: {
    title: string;
    image: string;
  };
  children: any;
  isNavOpen?: boolean;
}

export function Content({header, children, isNavOpen}: ContentProps) {
  return (
    <div className={classnames('content', {'nav-open': isNavOpen})}>
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

