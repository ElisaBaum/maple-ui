import {Validator} from './Validator';

export class RequiredValidator implements Validator {

  constructor(private formField: any,
              private message = '') {

  }

  validate() {
    return !!this.formField.value;
  }

}
