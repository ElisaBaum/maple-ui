import * as React from 'react';
import {Component} from "react";

interface FormGroupProps {
  name?: string;
  children: any[];
}

export class FormGroup extends Component<FormGroupProps> {

  constructor(props, context) {
    super(props, context);
    this.state = {...this.state, value: false};
  }

  render() {
    const {name, children} = this.props;
    return (
      <div className="form-group">
        {
          name &&
          <label className="form-label">{name}</label>
        }
        {...children as any[]}
      </div>
    );
  }

}
