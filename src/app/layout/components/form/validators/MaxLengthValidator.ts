import {Validator} from './Validator';

export type MaxLengthOptions = number | [number, string];

export const MAX_LENGTH_PLACEHOLDER = '$maxLength';

export class MaxLengthValidator extends Validator {

  private message: string;
  private maxLength: number;

  constructor(options: MaxLengthOptions) {
    super();
    if (Array.isArray(options)) {
      const [maxLength, message] = options;
      this.message = message;
      this.maxLength = maxLength;
    } else {
      this.maxLength = options;
      this.message = `Max length exceeded (${MAX_LENGTH_PLACEHOLDER})`;
    }
  }

  validate() {
    const value = this.formInput.getValue() as string;
    return !value || value.length <= this.maxLength;
  }

  getMessage(): string {
    return this.message.replace(MAX_LENGTH_PLACEHOLDER, this.maxLength.toString());
  }
}
