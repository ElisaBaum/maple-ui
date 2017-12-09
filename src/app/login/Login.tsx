import * as React from 'react';
import {Logo} from "../layout/components/logo/Logo";
import {Form} from '../layout/components/form/Form';
import {FormField} from '../layout/components/form/form-field/FormField';
import {FormButton} from '../layout/components/form/form-button/FormButton';
import './Login.scss';

interface LoginProps {
  loading: boolean;
  onSubmit(data: { name: string; code: string });
}

export function Login({loading, onSubmit}: LoginProps) {
  return (
    <div className={'login'}>
      <Logo className={'login-logo'} useHalf={true}/>
      <Form onSubmit={({isValid, values}) => isValid && onSubmit(values)}
            loading={loading}>
        <FormField name="name"
                   placeholder="Name"
                   required={'Bitte Name eingeben!'}/>
        <FormField name="code"
                   placeholder="Code"
                   required={'Bitte Code eingeben!'}/>
        <FormButton>Einloggen</FormButton>
      </Form>
    </div>
  );
}

