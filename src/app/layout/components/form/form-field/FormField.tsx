import * as React from 'react';
import * as classnames from 'classnames';
import {FormInput, FormInputProps, FormInputState} from '../FormInput';
import {RequiredValidator} from "../validators/RequiredValidator";
import 'spectre.css/dist/spectre.css';
import 'spectre.css/dist/spectre-icons.min.css';

interface FormFieldProps extends FormInputProps {
  placeholder: string;
  label?: string;
  type?: string;
  icon?: string | [string, 'left' | 'right'];
}

export class FormField extends FormInput<FormFieldProps, FormInputState> {

  constructor(props, context) {
    super(props, context, {
      required: RequiredValidator
    });
    this.state = {...this.state, value: ''};
  }

  handleChange(e) {
    this.setValue(e.target.value);
    super.handleChange(e);
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
    const {errorMessages, value} = this.state;
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
               value={value}
               onChange={e => this.handleChange(e)}
               placeholder={placeholder}/>
        {iconElement}
        {errorMessageElements}
      </div>
    );
  }
}
