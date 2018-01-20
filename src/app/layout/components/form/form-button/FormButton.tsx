import * as React from 'react';
import {Button} from '../../button/Button';
import {FormContext} from '../Form';
import {SFC} from 'react';
import {bool} from 'prop-types';

interface FormButtonProps {
  children: string;
  className?: string;
}

export function FormButton({children, className}: FormButtonProps,
                           {loading}: FormContext) {
  return (
    <Button htmlType={'submit'} loading={loading} className={`btn-block ${className}`}>
      {children}
    </Button>
  );
}

(FormButton as SFC).contextTypes = {loading: bool};
