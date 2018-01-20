import * as React from 'react';
import {Component} from "react";
import * as classNames from 'classnames';
import './Nav.scss';

interface NavProps {
  children: any[];
}

interface NavState {
  isActive: boolean;
}

export class Nav extends Component<NavProps, NavState> {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
  }

  onClick() {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }));
  }

  render() {
    const {children} = this.props;
    const {isActive} = this.state;
    const buttonClass = classNames('button_container', {active: isActive});
    const otherClass = classNames('overlay', {open: isActive});

    return (
      <div className="navigation">

        <button className={buttonClass}  onClick={() => this.onClick()}>
          <span className="top"></span>
          <span className="middle"></span>
          <span className="bottom"></span>
        </button>

        <div className={otherClass} id="overlay">
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
