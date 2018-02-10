import * as React from 'react';
import * as classNames from 'classnames';
import {Component, ReactElement} from 'react';
import './FadeIn.scss';
import {HTMLAttributes} from 'react';

interface FadeInProps extends HTMLAttributes<{}> {
  whenLoaded?: boolean;
  children: ReactElement<{ onLoad: (...args) => any }>;
}

interface FadeInState {
  opacity: number;
}

export class FadeIn extends Component<FadeInProps, FadeInState> {

  constructor(props) {
    super(props);
    this.state = {
      opacity: 0
    };
  }

  componentDidMount() {
    const {whenLoaded} = this.props;
    if (!whenLoaded) {
      setTimeout(() => this.setState({opacity: 1}), 100);
    }
  }

  render() {
    const {opacity} = this.state;
    const {children, className, whenLoaded, ...restProps} = this.props;
    const preparedChildren = React.cloneElement(children, {
      ...restProps,
      onLoad: () => this.setState({opacity: 1}),
      style: {...children.props.style, opacity},
      className: classNames(className, children.props.className, 'fade-in'),
    });
    return ({...preparedChildren});
  }
}
