import * as React from 'react';
import {Component} from 'react';
import {func} from 'prop-types';
import {FormField} from './FormField';

export interface SubmitEvent<T = any> {
  isValid: boolean;
  values: T;
}

interface FormProps {
  children: any[];
  onSubmit(e: SubmitEvent);
}

export class Form extends Component<FormProps> {

  static childContextTypes = {addField: func};

  fields: FormField[] = [];

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  getChildContext() {
    return {addField: field => this.fields.push(field)};
  }

  handleSubmit(e) {
    e.preventDefault();
    const {onSubmit} = this.props;
    const isValid = this.validate();
    this.fields.forEach(field => field.validateOnChange = true);
    onSubmit({
      isValid,
      values: this.getValues()
    });
  }

  getValues() {
    return this.fields.reduce((values, field) => {
      values[field.getName()] = field.getValue();
      return values;
    }, {});
  }

  validate() {
    return this.fields.reduce((isValid, field) => {
      const result = field.validate();
      return result && isValid;
    }, true);
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
