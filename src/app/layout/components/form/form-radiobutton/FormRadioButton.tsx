import * as React from 'react';
import {FormInput, FormInputProps, FormInputState} from "../FormInput";
import {RequiredValidator} from "../validators/RequiredValidator";
import './FormRadioButton.scss';

interface FormRadioButtonProps extends FormInputProps {
  label: string;
}

export class FormRadioButton extends FormInput<FormRadioButtonProps, FormInputState> {

  constructor(props, context) {
    super(props, context, {
      required: RequiredValidator
    });
    this.state = {...this.state, value: false};
  }

  async handleChange(e) {
    await this.setValue(e.target.checked);
    super.handleChange(e);
  }

  render() {
    const {value} = this.state;
    const {name, label} = this.props;
    return (
      <label className="form-radio-button">
        <input type="radio"
               name={name}
               checked={value}
               onChange={e => this.handleChange(e)}/>
        <i className="form-icon"></i>
        {label}
      </label>
    );
  }

}
