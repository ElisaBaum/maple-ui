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

export class FadeGallery extends Component<FadeGalleryProps, FadeGalleryState> {

  timeoutId: any;

  constructor(props) {
    super(props);
    this.state = {nextIndex: -1, currentIndex: 0};
  }

  componentDidMount() {
    const {children, speed} = this.props;
    const childArray = React.Children.toArray(children);
    const childrenLength = childArray.length;
    let currentIndex = 0;
    let initialSpeed = 1500;

    const doIt = () => this.timeoutId = setTimeout(() => {
      initialSpeed = 0;
      let nextIndex = currentIndex + 1;
      if (nextIndex === childrenLength) {
        nextIndex = 0;
      }
      this.setState({nextIndex, currentIndex});
      currentIndex = nextIndex;
      doIt();
    }, initialSpeed || speed || 5500);
    doIt();
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
