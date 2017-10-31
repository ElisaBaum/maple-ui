import * as React from 'react';
import {Form, Input, Icon} from 'antd';
import {ValidationRule, WrappedFormUtils} from "antd/lib/form/Form";
import './FormField.scss';

interface FormFieldProps {
  form: WrappedFormUtils;
  placeholder: string;
  iconType?: string;
  id: string;
  rules: ValidationRule[];
}

export function FormField({id, form, placeholder, iconType, rules}: FormFieldProps) {
  return (
    <Form.Item className={'form-field'}>
      {form.getFieldDecorator(id, {rules})(
        <Input prefix={iconType && <Icon type={iconType} style={{fontSize: 13}}/>}
               placeholder={placeholder}
               className={'input'}/>
      )}
    </Form.Item>
  );
}
