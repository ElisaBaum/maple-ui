import * as React from 'react';
import * as classnames from 'classnames';
import {Component} from 'react';
import {func} from 'prop-types';
import {RequiredOptions, RequiredValidator} from '../form/validators/RequiredValidator';
import {Validator} from '../form/validators/Validator';
import {FormField} from '../form/FormField';
import './FormInput.scss';


interface FormInputProps {
  name: string;
  placeholder: string;
  label?: string;
  type?: string;
  required?: RequiredOptions;
  validators?: Validator[];
  iconType?: string;
}

export class FormInput extends Component<FormInputProps, any> implements FormField {
  static contextTypes = {addField: func};

  hasTriedToSubmit: boolean;
  validators: Validator[] = [];
  value: string;

  constructor(props) {
    super(props);
    this.state = {errorMessages: []};
  }

  componentDidMount() {
    this.context.addField(this);
    this.applyBuiltInValidators();
    this.applyCustomValidators();
  }

  applyBuiltInValidators() {
    const validatorMap = {
      required: RequiredValidator
    };
    const validators = Object
      .keys(validatorMap)
      .filter(key => this.props[key])
      .map(key => {
        const validator: Validator = new validatorMap[key](this.props[key]);
        validator.setFormField(this);
        return validator;
      });
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

  triedToSubmit() {
    this.hasTriedToSubmit = true;
  }

  handleChange(e) {
    this.value = e.target.value;
    if (this.hasTriedToSubmit) {
      this.validate();
    }
  }

  render() {
    const {name, label, placeholder, type} = this.props;
    const {errorMessages} = this.state;
    const hasErrors = !!errorMessages.length;
    return (
      <div className={classnames('form-group', {'has-error': hasErrors})}>
        {label && <label className="form-label"
                         htmlFor={name}>{label}</label>}
        <input className="form-input"
               type={type || 'text'}
               name={name}
               onChange={e => this.handleChange(e)}
               placeholder={placeholder}/>
        {errorMessages.map((errorMessage, index) => (
          <p key={index} className="form-input-hint">{errorMessage}</p>
        ))}
      </div>
    );
  }
}
