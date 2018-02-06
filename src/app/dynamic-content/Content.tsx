import * as React from 'react';
import * as classNames from 'classnames';
import './Content.scss';
import {FadeIn} from '../layout/components/fade-in/FadeIn';
import {Image} from '../layout/components/image/Image';

interface ContentProps {
  header: {
    title: string;
    image: string;
  };
  children: any;
  className?: string;
  style?: any;
}

export function Content({header, children, className, style}: ContentProps) {
  return (
    <div className={classNames('content', className)} style={style}>
      <div className={'header'}>
        <div className={'header-content'}>
          <FadeIn whenLoaded>
            <Image src={header.image} size={'cover'} positionX={'center'} positionY={'top'}/>
          </FadeIn>
          <div className={'header-text'}>
            {header.title}
          </div>
        </div>
      </div>
      <div className={'content-content'}>
        {...children}
      </div>
    </div>
  );
}

