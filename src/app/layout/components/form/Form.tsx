import * as React from 'react';
import {ChildContextProvider, Component} from 'react';
import {func, bool} from 'prop-types';
import {FormInput, FormInputProps, FormInputState} from './FormInput';
import './Form.scss';

export interface SubmitEvent<T = any> {
  isValid: boolean;
  values: T;
}

export type PropTypesFormContext = {
  [P in keyof FormContext]: any;
  };

export interface FormContext {
  loading?: boolean;
  addField(input: FormInput<FormInputProps, FormInputState>);
  submit();
}

interface FormProps {
  children: any[] | any;
  values?: any;
  loading?: boolean;
  disabled?: boolean;
  onSubmit(e: SubmitEvent);
}

export class Form extends Component<FormProps> implements ChildContextProvider<FormContext> {

  static childContextTypes: PropTypesFormContext = {addField: func, loading: bool, submit: func};

  inputs: Array<FormInput<FormInputProps, FormInputState>> = [];

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  getChildContext() {
    const {loading} = this.props;
    return {
      addField: field => this.inputs.push(field),
      submit: () => this.handleSubmit(),
      loading
    };
  }

  componentDidMount() {
    const {values} = this.props;
    if (values) {
      this.setValues(values);
    }
  }

  handleSubmit() {
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
    const {children, loading, disabled} = this.props;
    const isDisabled = (loading && disabled === undefined) || disabled;
    return (
      <form className={'form'}
            onSubmit={e => {
              e.preventDefault();
              this.handleSubmit();
            }}>
        <fieldset disabled={isDisabled}>
          {...children as any}
        </fieldset>
      </form>
    );
  }
}
