import * as React from 'react';
import {Logo} from "../layout/components/logo/Logo";
import {Form} from '../layout/components/form/Form';
import {FormTextField} from '../layout/components/form/form-text-field/FormTextField';
import {FormButton} from '../layout/components/form/form-button/FormButton';
import {Card} from '../layout/components/card/Card';
import './Login.scss';
import {Item} from '../layout/components/item/Item';

interface LoginProps {
  loading: boolean;
  onSubmit(data: { name: string; code: string });
}

export function Login({loading, onSubmit}: LoginProps) {
  return (
    <div className={'login'}>
      <Card>
        <div className="title">Login</div>
        <Logo className={'login-logo'}/>
        <Form onSubmit={({isValid, values}) => isValid && onSubmit(values)}
              loading={loading}>
          <FormTextField name="name"
                         label="Name"
                         required={'Bitte Name eingeben!'}/>
          <FormTextField name="code"
                         label="Code"
                         type="password"
                         required={'Bitte Code eingeben!'}/>
          <Item>
            <FormButton>Einloggen</FormButton>
          </Item>
        </Form>
      </Card>
    </div>
  );
}

