import * as React from 'react';
import {Button, ButtonType} from '../../button/Button';
import {FormContext} from '../Form';
import {SFC} from 'react';
import {bool} from 'prop-types';

interface FormButtonProps {
  children: string;
  type?: ButtonType;
}

export function FormButton({children, type}: FormButtonProps, {loading}: FormContext) {
  return (
    <Button htmlType={'submit'} loading={loading} className={'btn-block'} type={type}>
      {children}
    </Button>
  );
}

(FormButton as SFC).contextTypes = {loading: bool};
