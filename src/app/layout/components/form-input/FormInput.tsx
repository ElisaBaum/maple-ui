import * as React from 'react';
import * as classnames from 'classnames';
import {Component} from 'react';
import {func} from 'prop-types';
import {RequiredOptions, RequiredValidator} from '../form/validators/RequiredValidator';
import {Validator} from '../form/validators/Validator';
import {FormField} from '../form/FormField';
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-icons.min.css';

interface FormInputProps {
  name: string;
  placeholder: string;
  label?: string;
  type?: string;
  required?: RequiredOptions;
  validators?: Validator[];
  icon?: string | [string, 'left' | 'right'];
}

interface FormInputState {
  errorMessages: string[];
}

export class FormInput extends Component<FormInputProps, FormInputState> implements FormField {
  static contextTypes = {addField: func};

  validateOnChange: boolean;
  validators: Validator[] = [];
  value: string;

  constructor(props, context) {
    super(props, context);
    this.state = {errorMessages: []};
  }

  componentDidMount() {
    this.context.addField(this);
    this.initValidators();
  }

  initValidators() {
    this.applyBuiltInValidators();
    this.applyCustomValidators();
    this.validators.forEach(validator => validator.init(this));
  }

  applyBuiltInValidators() {
    const validatorMap = {
      required: RequiredValidator
    };
    const validators = Object
      .keys(validatorMap)
      .filter(key => this.props[key])
      .map(key => new validatorMap[key](this.props[key]));
    this.validators.push(...validators);
  }

  applyCustomValidators() {
    const {validators} = this.props;
    if (validators) {
      this.validators.push(...validators);
    }
  }

  validate(): boolean {
    const errorMessages = this.validators
      .filter(validator => !validator.validate())
      .map(validator => validator.getMessage());
    this.setState({errorMessages});
    return !errorMessages.length;
  }

  getValue() {
    return this.value;
  }

  getName() {
    return this.props.name;
  }

  handleChange(e) {
    this.value = e.target.value;
    if (this.validateOnChange) {
      this.validate();
    }
  }

  renderLabel() {
    const {label} = this.props;
    if (label) {
      return (<label className="form-label" htmlFor={name}>{label}</label>);
    }
  }

  renderIcon() {
    const {icon} = this.props;
    const iconCss = !!icon && (typeof icon === 'string' ? icon : icon[0]);
    if (iconCss) {
      return (<i className={classnames('form-icon', 'icon', iconCss)}></i>);
    }
  }

  renderErrorMessages() {
    const {errorMessages} = this.state;
    return errorMessages.map((errorMessage, index) => (
      <p key={index} className="form-input-hint">{errorMessage}</p>
    ));
  }

  render() {
    const {name, placeholder, type, icon} = this.props;
    const {errorMessages} = this.state;
    const hasErrors = !!errorMessages.length;
    const hasIconCss = !!icon && ('has-icon-' + (typeof icon !== 'string' ? icon[1] : 'left'));
    const labelElement = this.renderLabel();
    const iconElement = this.renderIcon();
    const errorMessageElements = this.renderErrorMessages();
    return (
      <div className={classnames('form-group', hasIconCss, {'has-error': hasErrors})}>
        {labelElement}
        <input className="form-input"
               type={type || 'text'}
               name={name}
               onChange={e => this.handleChange(e)}
               placeholder={placeholder}/>
        {iconElement}
        {errorMessageElements}
      </div>
    );
  }
}
