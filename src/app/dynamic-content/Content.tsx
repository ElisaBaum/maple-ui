import * as React from 'react';
import * as classNames from 'classnames';
import './Content.scss';
import {FadeIn} from '../layout/components/fade-in/FadeIn';
import {FadeGallery} from '../layout/components/fade-gallery/FadeGallery';

interface ContentProps {
  header: {
    title: string;
    image: string;
  };
  children: any;
  className?: string;
  style?: any;
}

const Block = ({color, ...props}) =>
  <div {...props} style={{width: '100%', height: '100%', background: color}}></div>;

export function Content({header, children, className, style}: ContentProps) {
  return (
    <div className={classNames('content', className)} style={style}>
      <div className={'header'}>
        <FadeGallery>
          <FadeIn whenLoaded>
            <img className={'header-img'} src={header.image}/>
          </FadeIn>
          <Block color={'red'}/>
          <Block color={'yellow'}/>
          <Block color={'blue'}/>
          <Block color={'green'}/>
        </FadeGallery>
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

