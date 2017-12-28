import {Component} from "react";
import {Validator} from "./validators/Validator";
import {bool, func} from "prop-types";
import {FormContext, PropTypesFormContext} from './Form';

export interface FormInputChangeEvent<T = any> {
  isValid?: boolean;
  event: any;
  value: T;
}

export interface FormInputProps {
  name: string;
  value?: any;
  validators?: Validator[];
  onChange?(e: FormInputChangeEvent);
}

export interface FormInputState {
  errorMessages: string[];
  value: any;
}

export abstract class FormInput<P extends FormInputProps, S extends FormInputState> extends Component<P, S> {
  static contextTypes: PropTypesFormContext = {addField: func, loading: bool};

  validateOnChange: boolean;
  validators: Validator[] = [];
  validatorMap: { [key: string]: Validator };
  context: FormContext;

  constructor(props, context, validatorMap) {
    super(props, context);
    this['state' as any] = {errorMessages: []};
    this.validatorMap = validatorMap;
  }

  getValue() {
    return this.state.value;
  }

  setValue(value: any) {
    return new Promise(resolve => this.setState({value, errorMessages: []}, resolve));
  }

  componentWillReceiveProps(props: FormInputProps) {
    this.trySetValue(props);
  }

  componentDidMount() {
    if (this.context && this.context.addField) {
      this.context.addField(this);
    }
    this.initValidators(this.validatorMap);
    this.trySetValue(this.props);
  }

  getName() {
    return this.props.name;
  }

  handleChange(event) {
    const {onChange} = this.props;
    let isValid;
    if (this.validateOnChange) {
      isValid = this.validate();
    }
    if (onChange) {
      onChange({isValid, event, value: this.getValue()});
    }
  }

  validate(): boolean {
    const errorMessages = this.validators
      .filter(validator => !validator.validate())
      .map(validator => validator.getMessage());
    this.setState({errorMessages});
    return !errorMessages.length;
  }

  private trySetValue({value}: FormInputProps) {
    if (value !== undefined) {
      this.setValue(value);
    }
  }

  private initValidators(validatorMap) {
    this.applyBuiltInValidators(validatorMap);
    this.applyCustomValidators();
    this.validators.forEach(validator => validator.init(this));
  }

  private applyBuiltInValidators(validatorMap) {
    const validators = Object
      .keys(validatorMap)
      .filter(key => this.props[key])
      .map(key => new validatorMap[key](this.props[key]));
    this.validators.push(...validators);
  }

  private applyCustomValidators() {
    const validators = this.props.validators as Validator[];
    if (validators) {
      this.validators.push(...validators);
    }
  }

}
