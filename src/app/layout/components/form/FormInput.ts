import {Component} from "react";
import {Validator} from "./validators/Validator";
import {RequiredOptions} from "./validators/RequiredValidator";
import {func} from "prop-types";

export interface FormInputChangeEvent {
  isValid?: boolean;
  event: any;
}

export interface FormInputProps {
  name: string;
  required?: RequiredOptions;
  validators?: Validator[];
  onChange?(e: FormInputChangeEvent);
}

export interface FormInputState {
  errorMessages: string[];
}

export abstract class FormInput<P extends FormInputProps, S extends FormInputState> extends Component<P, S> {
  static contextTypes = {addField: func};

  validateOnChange: boolean;
  validators: Validator[] = [];
  validatorMap: {[key: string]: Validator};

  constructor(props, context, validatorMap) {
    super(props, context);
    this['state' as any] = {errorMessages: []};
    this.validatorMap = validatorMap;
  }

  abstract getValue(): any;

  componentDidMount() {
    if (this.context && this.context.addField) {
      this.context.addField(this);
    }
    this.initValidators(this.validatorMap);
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
      onChange({isValid, event});
    }
  }

  validate(): boolean {
    const errorMessages = this.validators
    .filter(validator => !validator.validate())
    .map(validator => validator.getMessage());
    this.setState({errorMessages});
    return !errorMessages.length;
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
