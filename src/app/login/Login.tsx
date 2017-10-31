import * as React from 'react';
import {Component} from 'react';
import {Form} from 'antd';
import {FormComponentProps} from 'antd/es/form/Form';
import {Logo} from "../layout/components/logo/Logo";
import './Login.scss';
import {FormField} from "../layout/components/form-field/FormField";
import {Button} from "../layout/components/button/Button";

export interface LoginProps {
  onSubmit(data: any);
}

export const Login = Form.create<LoginProps>()(
  class extends Component<LoginProps & FormComponentProps> {

    handleSubmit(e) {
      const {form, onSubmit} = this.props;
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          onSubmit(values);
        }
      });
    }

    render() {
      const {form} = this.props;
      return (
        <div className={'login'}>
          <Logo className={'login-logo'} useHalf={true}/>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <FormField form={form}
                       id="name"
                       placeholder="Name"
                       iconType="user"
                       rules={[{required: true, message: 'Bitte Name eingeben!'}]}/>
            <FormField form={form}
                       placeholder="Code"
                       iconType="lock"
                       id="code"
                       rules={[{required: true, message: 'Bitte Code eingeben!'}]}/>
            <Form.Item>
              <Button text="Einloggen"
                      htmlType="submit"/>
            </Form.Item>
          </Form>
        </div>
      );
    }
  }
);
