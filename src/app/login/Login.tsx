import * as React from 'react';
import {Logo} from "../layout/components/logo/Logo";
import {Form} from '../layout/components/form/Form';
import {Button} from '../layout/components/button/Button';
import {FormInput} from '../layout/components/form-input/FormInput';
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
        <FormInput name="name"
                   placeholder="Name"
                   iconType="user"
                   required={'Bitte Name eingeben!'}/>
        <FormInput name="code"
                   placeholder="Code"
                   iconType="lock"
                   required={'Bitte Code eingeben!'}/>
        <Button loading={loading}
                htmlType="submit">Einloggen</Button>
      </Form>
    </div>
  );
}

