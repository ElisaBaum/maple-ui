import * as React from 'react';
import {Component} from "react";
import * as classNames from 'classnames';
import './Navigation.scss';

interface NavigationProps {
  children: any[];
}

interface NavigationState {
  isActive: boolean;
}

export class Navigation extends Component<NavigationProps, NavigationState> {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
  }

  toggleActiveState() {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }));
  }

  render() {
    const {children} = this.props;
    const {isActive} = this.state;
    const buttonClass = classNames('button_container', {active: isActive});
    const overlayClass = classNames('overlay', {open: isActive});

    return (
      <div className="navigation">
        <button className={buttonClass}  onClick={() => this.toggleActiveState()}>
          <span className="top"/>
          <span className="middle"/>
          <span className="bottom"/>
        </button>

        <div className={overlayClass} id="overlay">
          <nav className="overlay-menu">
            <ul>
              {
                children.map((child, index) => (
                  <li key={index} onClick={() => this.setState({isActive: false})}>
                    {child}
                  </li>
                ))
              }
            </ul>
          </nav>
        </div>
      </div>
    );
  }

}
