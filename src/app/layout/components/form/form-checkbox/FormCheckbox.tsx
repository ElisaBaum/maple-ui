import * as React from 'react';
import {FormInput, FormInputProps, FormInputState} from "../FormInput";
import {RequiredValidator} from "../validators/RequiredValidator";

export class FormCheckbox extends FormInput<FormInputProps, FormInputState> {

  value: boolean;

  constructor(props, context) {
    super(props, context, {
      required: RequiredValidator
    });
  }

  getValue() {
    return this.value;
  }

  handleChange(e) {
    this.value = e.target.checked;
    super.handleChange(e);
  }

  render() {
    const {name} = this.props;
    return (
      <div className="form-group">
        <label className="form-checkbox">
          <input type="checkbox"
                 onChange={e => this.handleChange(e)}/>
          <i className="form-icon"></i>
          {name}
        </label>
      </div>
    );
  }

}
