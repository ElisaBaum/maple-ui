import * as React from 'react';
import * as classNames from 'classnames';
import {FadeIn} from '../layout/components/fade-in/FadeIn';
import {FadeGallery, GalleryItem} from '../layout/components/fade-gallery/FadeGallery';
import {Image} from '../layout/components/image/Image';
import {Component} from "react";
import 'match-media';
import './Content.scss';

interface ContentProps {
  header: {
    title: string;
    images: string[];
  };
  children: any;
  className?: string;
  style?: any;
  isNavOpen?: boolean;
}

interface ContentState {
  isPortrait: boolean;
}

export class Content extends Component<ContentProps, ContentState> {

  vertical = /_(h|)v(h|)\.(jpg|jpeg|png)/i;
  horizontal = /_(v|)h(v|)\.(jpg|jpeg|png)/i;
  portraitMediaQuery: MediaQueryList;
  handleOrientationChange: (mediaQuery) => any;

  constructor(props) {
    super(props);

    this.portraitMediaQuery = matchMedia('(orientation: portrait)');
    this.handleOrientationChange = mediaQuery => this.setState({isPortrait: mediaQuery.matches});
    this.state = {isPortrait: this.portraitMediaQuery.matches};
  }

  componentDidMount() {
    this.portraitMediaQuery.addListener(this.handleOrientationChange);
  }

  componentWillUnmount() {
    this.portraitMediaQuery.removeListener(this.handleOrientationChange);
  }

  filterImages(images: string[]) {
    if (this.state.isPortrait) {
      return images.filter(image => this.vertical.test(image));
    }
    return images.filter(image => this.horizontal.test(image));
  }

  render() {
    const {header, children, className, style, isNavOpen} = this.props;
    return (
      <div className={classNames('content', {'nav-open': isNavOpen}, className)}
           style={style}>
        <div className={classNames('header', {'header-sm': !header.images.length})}>
          <div className={'header-content'}>
            <FadeGallery>
              {this.filterImages(header.images).map((image, index) => (
                <GalleryItem key={index}>
                  <FadeIn whenLoaded>
                    <Image src={image}
                           size={'cover'}
                           positionX={'center'}
                           positionY={'top'}/>
                  </FadeIn>
                </GalleryItem>
              ))}
            </FadeGallery>
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
}
