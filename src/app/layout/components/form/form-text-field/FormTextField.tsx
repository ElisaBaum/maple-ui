import * as React from 'react';
import {FormInput, FormInputProps, FormInputState} from '../FormInput';
import {RequiredOptions, RequiredValidator} from "../validators/RequiredValidator";
import {MaxLengthOptions, MaxLengthValidator} from '../validators/MaxLengthValidator';
import {TextField} from '../../controls/text-field/TextField';
import {Label} from '../../controls/label/Label';

interface FormTextFieldProps extends FormInputProps {
  placeholder?: string;
  required?: RequiredOptions;
  maxLength?: MaxLengthOptions;
  label?: string;
  type?: string;
}

export class FormTextField extends FormInput<FormTextFieldProps, FormInputState> {

  constructor(props, context) {
    super(props, context, {
      required: RequiredValidator,
      maxLength: MaxLengthValidator,
    });
    this.state = {...this.state, value: ''};
  }

  async handleChange(e) {
    await this.setValue(e.target.value);
    super.handleChange(e);
  }

  renderErrorMessages() {
    const {errorMessages} = this.state;
    return errorMessages.map((errorMessage, index) => (
      <span key={index}>{errorMessage}</span>
    ));
  }

  render() {
    const {name, type, label} = this.props;
    const {errorMessages, value} = this.state;
    const hasErrors = !!errorMessages.length;
    const floatLabel = !!value;
    const showLabel = !hasErrors || (!value || !hasErrors);
    const errorMessageElements = this.renderErrorMessages();
    return (
      <TextField labels={() => (
        <span>
          {showLabel && <Label floated={floatLabel}>{label}</Label>}
          <Label floated error>{errorMessageElements}</Label>
        </span>
      )}
                 type={type || 'text'}
                 name={name}
                 value={value}
                 onChange={e => this.handleChange(e)}/>
    );
  }
}
