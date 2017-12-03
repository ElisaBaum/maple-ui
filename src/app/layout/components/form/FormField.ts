
export interface FormField {
  validateOnChange: boolean;
  getName(): string;
  getValue(): any;
  validate(): boolean;
}
