import * as React from 'react';
import * as classNames from 'classnames';
import {InputHTMLAttributes} from 'react';
import {ReactNode} from 'react';
import './TextField.scss';

interface TextFieldProps extends InputHTMLAttributes<any> {
  icon?: string;
  iconPosition?: 'left' | 'right';
  labels?: () => ReactNode | ReactNode[];
  item?: boolean;
  loading?: boolean;

  inputRef?(input: HTMLInputElement);
}

export function TextField({labels, inputRef, icon, iconPosition, item, loading, ...inputProps}: TextFieldProps) {
  return (
    <label className={classNames(
      'text-field',
      icon ? (iconPosition || 'has-icon-left') : '',
      {item},
    )}>
      {labels && labels()}
      <input ref={inputRef} {...inputProps}/>
      <i className={classNames('icon', loading ? 'loading' : 'material-icons')}>{icon}</i>
    </label>
  );
}
