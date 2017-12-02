
export interface Validator {
  getMessage(): string;
  validate(): boolean;
}
