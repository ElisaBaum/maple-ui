import {Validator} from './Validator';

export type RequiredOptions = boolean | string;

export class RequiredValidator extends Validator {

  private message: string;

  constructor(options: RequiredOptions) {
    super();
    this.message = typeof options === 'string' ? options : 'Field is required';
  }

  validate() {
    return !!this.formField.getValue();
  }

  getMessage(): string {
    return this.message;
  }
}
