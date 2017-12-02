import {Validator} from './Validator';
import {FormField} from '../FormField';

export type RequiredOptions = boolean | string;

export class RequiredValidator implements Validator {

  private message: string;
  private formField: FormField;

  constructor(options: RequiredOptions) {
    this.message = typeof options === 'string' ? options : 'Field is required';
  }

  validate() {
    return !!this.formField.getValue();
  }

  setFormField(formField: FormField) {
    this.formField = formField;
  }

  getMessage(): string {
    return this.message;
  }
}
