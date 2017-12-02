import {FormField} from '../FormField';

export interface Validator {
  getMessage(): string;
  validate(): boolean;
  setFormField(field: FormField);
}
