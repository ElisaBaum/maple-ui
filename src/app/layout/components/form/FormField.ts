
export interface FormField {
  getName(): string;
  getValue(): any;
  validate(): boolean;
  triedToSubmit();
}
