import * as React from 'react';
import {Logo} from "../layout/components/logo/Logo";
import {Form} from '../layout/components/form/Form';
import {Button} from '../layout/components/button/Button';
import {FormField} from '../layout/components/form/form-field/FormField';
import './Login.scss';

interface LoginProps {
  loading: boolean;
  onSubmit(data: { name: string; code: string });
}

export function Login({loading, onSubmit}: LoginProps) {
  return (
    <div className={'login'}>
      <Logo className={'login-logo'} useHalf={true}/>
      <Form onSubmit={({isValid, values}) => isValid && onSubmit(values)}>
        <FormField name="name"
                   placeholder="Name"
                   required={'Bitte Name eingeben!'}/>
        <FormField name="code"
                   placeholder="Code"
                   required={'Bitte Code eingeben!'}/>
        <Button loading={loading}
                htmlType="submit">Einloggen</Button>
      </Form>
    </div>
  );
}

