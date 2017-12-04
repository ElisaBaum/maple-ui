import * as React from 'react';
import {Component} from 'react';
import {func} from 'prop-types';
import {FormInput, FormInputProps, FormInputState} from './FormInput';

export interface SubmitEvent<T = any> {
  isValid: boolean;
  values: T;
}

interface FormProps {
  children: any[];
  values?: any;
  onSubmit(e: SubmitEvent);
}

export class Form extends Component<FormProps> {

  static childContextTypes = {addField: func};

  inputs: Array<FormInput<FormInputProps, FormInputState>> = [];

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  getChildContext() {
    return {addField: field => this.inputs.push(field)};
  }

  componentDidMount() {
    const {values} = this.props;
    if (values) {
      this.setValues(values);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const {onSubmit} = this.props;
    const isValid = this.validate();
    this.inputs.forEach(field => field.validateOnChange = true);
    onSubmit({
      isValid,
      values: this.getValues()
    });
  }

  getValues() {
    return this.inputs.reduce((values, field) => {
      values[field.getName()] = field.getValue();
      return values;
    }, {});
  }

  setValues(values: any) {
    this.inputs.forEach(input => {
      const value = values[input.getName()];
      if (value) {
        input.setValue(value);
      }
    });
  }

  validate() {
    return this.inputs.reduce((isValid, field) => {
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
