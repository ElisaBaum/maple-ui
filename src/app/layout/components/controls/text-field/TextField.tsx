import * as React from 'react';
import {InputHTMLAttributes} from 'react';
import {ReactNode} from 'react';
import './TextField.scss';

interface TextFieldProps extends InputHTMLAttributes<any> {
  labels?: () => ReactNode | ReactNode[];
  inputRef?(input: HTMLInputElement);
}

export function TextField({labels, inputRef, ...inputProps}: TextFieldProps) {
  return (<label className={'text-field'}>
    {labels && labels()}
    <input ref={inputRef} {...inputProps}/>
  </label>);
}
