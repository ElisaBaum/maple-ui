import * as React from 'react';
import {Link} from "react-router-dom";
import {Component} from "react";

interface NavigationItemProps {
  target: string;
  text: string;
}

export class NavigationItem extends Component<NavigationItemProps> {

  render() {
    const {target, text} = this.props;
    return (
      <Link className={'navigation-item'} to={target}>
        {text}
      </Link>
    );
  }
}

