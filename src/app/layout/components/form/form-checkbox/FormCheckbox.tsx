import * as React from 'react';
import {FormInput, FormInputProps, FormInputState} from "../FormInput";
import {RequiredValidator} from "../validators/RequiredValidator";

export class FormCheckbox extends FormInput<FormInputProps, FormInputState> {

  constructor(props, context) {
    super(props, context, {
      required: RequiredValidator
    });
    this.state = {...this.state, value: false};
  }

  handleChange(e) {
    this.setValue(e.target.checked);
    super.handleChange(e);
  }

  render() {
    const {value} = this.state;
    const {name} = this.props;
    return (
      <div className="form-group">
        <label className="form-checkbox">
          <input type="checkbox"
                 checked={value}
                 onChange={e => this.handleChange(e)}/>
          <i className="form-icon"></i>
          {name}
        </label>
      </div>
    );
  }

}
