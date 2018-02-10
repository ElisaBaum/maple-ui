import * as React from 'react';
import {Component} from 'react';
import * as classNames from 'classnames';
import './FadeGallery.scss';

interface FadeGalleryProps {
  children: any[] | any;
  speed?: number;
}

interface FadeGalleryState {
  nextIndex: number;
  currentIndex: number;
}

interface GalleryItemProps {
  children?: any | any[];
  className?: string;
}

export function GalleryItem({children, className, ...props}: GalleryItemProps) {
  return (<div {...props} className={classNames('gallery-item', className)}>{...children}</div>);
}

export class FadeGallery extends Component<FadeGalleryProps, FadeGalleryState> {

  childrenLength: number = 0;
  timeoutId: any;

  constructor(props) {
    super(props);
    this.state = {nextIndex: -1, currentIndex: 0};
  }

  determineChildrenLength(children) {
    const childArray = React.Children.toArray(children);
    this.childrenLength = childArray.length;
  }

  componentWillReceiveProps({children}) {
    this.determineChildrenLength(children);
  }

  componentDidMount() {
    const {children, speed} = this.props;
    this.determineChildrenLength(children);
    let currentIndex = 0;
    let initialSpeed = 3500;

    const processRevolving = () => this.timeoutId = setTimeout(() => {
      initialSpeed = 0;
      let nextIndex = currentIndex + 1;
      if (nextIndex === this.childrenLength) {
        nextIndex = 0;
      }
      this.setState({nextIndex, currentIndex});
      currentIndex = nextIndex;
      processRevolving();
    }, initialSpeed || speed || 5500);
    processRevolving();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    const {nextIndex, currentIndex} = this.state;
    const {children} = this.props;
    const preparedChildren = React.Children.map(children, (child: any, index) =>
      React.cloneElement(child, {
        ...child.props,
        className: classNames(child.props.className, {
          next: index === nextIndex,
          current: index === currentIndex,
        })
      }));
    return (
      <div className={'fade-gallery'}>
        {...preparedChildren}
      </div>
    );
  }
}
