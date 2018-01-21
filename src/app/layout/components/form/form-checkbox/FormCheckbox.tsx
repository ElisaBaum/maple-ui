import * as React from 'react';
import * as classNames from 'classnames';
import {FormInput, FormInputProps, FormInputState} from "../FormInput";
import {RequiredValidator} from "../validators/RequiredValidator";
import './FormCheckbox.scss';

export interface FormCheckboxProps extends FormInputProps {
  useSwitch?: boolean;
}

export class FormCheckbox extends FormInput<FormCheckboxProps, FormInputState> {

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
    const {name, useSwitch} = this.props;
    const mainClass = useSwitch ? 'form-switch' : 'form-checkbox';
    return (
      <label className={classNames(mainClass)}>
        <input type="checkbox"
               checked={value}
               onChange={e => this.handleChange(e)}/>
        <i className="form-icon"></i>
        {name}
      </label>
    );
  }

}
