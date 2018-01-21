import * as React from 'react';
import {FormCheckbox, FormCheckboxProps} from '../form-checkbox/FormCheckbox';
import './FormSwitch.scss';

export function FormSwitch(props: FormCheckboxProps) {
  return (
    <FormCheckbox useSwitch={true} {...props}/>
  );
}
