import {FormField} from '../FormField';

export abstract class Validator {

  protected formField: FormField;

  abstract getMessage(): string;
  abstract validate(): boolean;

  init(formField: FormField) {
    this.formField = formField;
  }
}
