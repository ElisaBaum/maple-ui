import * as React from 'react';
import {Component} from 'react';
import {func} from 'prop-types';

interface FormProps {
  children: any[];
}

interface FormState {
  touched: boolean;
}

export class Form extends Component<FormProps, FormState> {

  static childContextTypes = {addField: func};

  fields = [];

  getChildContext() {
    return {addField: field => this.fields.push(field)};
  }

  handleSubmit(event) {

  }

  validate() {
    // this.fields.forEach(field)
  }

  render() {
    const {children} = this.props;
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        {...children as any}
      </form>
    );
  }
}
