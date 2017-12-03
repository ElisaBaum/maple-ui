import {FormInput, FormInputProps, FormInputState} from '../FormInput';

export abstract class Validator {

  protected formInput: FormInput<FormInputProps, FormInputState>;

  abstract getMessage(): string;
  abstract validate(): boolean;

  init(formInput: FormInput<FormInputProps, FormInputState>) {
    this.formInput = formInput;
  }
}
