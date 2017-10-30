import * as React from 'react';
import {Component} from 'react';
import {Form, Input, Icon, Button} from 'antd';
import {FormComponentProps} from 'antd/es/form/Form';

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
      const {form: {getFieldDecorator}} = this.props;
      return (
        <Form onSubmit={e => this.handleSubmit(e)}>
          <Form.Item>
            {getFieldDecorator('nameOrEmail', {
              rules: [{required: true, message: 'Bitte Name oder Email eingeben!'}],
            })(
              <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                     placeholder="Name oder Email"/>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('codeOrPassword', {
              rules: [{required: true, message: 'Bitte Code oder Passwort eingeben!'}],
            })(
              <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                     type="password"
                     placeholder="Code oder Passwort"/>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary"
                    htmlType="submit">
              Einloggen
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
);
