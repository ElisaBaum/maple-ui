import * as React from 'react';
import * as classnames from 'classnames';
import {Form, Input, Icon} from 'antd';
import {ValidationRule, WrappedFormUtils} from "antd/lib/form/Form";
import './FormField.scss';
import {Component} from 'react';
import {func} from 'prop-types';
import {RequiredValidator} from '../form/validators/RequiredValidator';
import {Validator} from '../form/validators/Validator';

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
        <Input prefix={iconType && <Icon type={iconType}/>}
               placeholder={placeholder}
               className={'input'}/>
      )}
    </Form.Item>
  );
}

interface FormField2Props {
  id: string;
  placeholder: string;
  label: string;
  type?: string;
  required?: boolean | { msg: string };
  iconType?: string;
}

export class FormField2 extends Component<FormField2Props> {
  static contextTypes = {addField: func};

  validators: Validator[];

  constructor(props) {
    super(props);
    this.state = {errorMessages: []};
  }

  componentDidMount() {
    this.context.addField(this);
  }

  applyValidators() {
    const validatorMap = {
      required: RequiredValidator
    };
    this.validators = Object
      .keys(validatorMap)
      .filter(key => this.props[key])
      .map(key => {
        return new validatorMap[key](this.props[key]);
      });
  }

  validate(): boolean {
    const errorMessages = this.validators
      .filter(validator => !validator.validate())
      .map(validator => validator.getMessage());
    this.setState({errorMessages});
    return !errorMessages.length;
  }

  render() {
    const {id, label, placeholder, type} = this.props;
    const {errorMessages} = this.state;
    const hasErrors = !!errorMessages.length;
    return (
      <div className={classnames('form-group', {'is-error': hasErrors})}>
        <label className="form-label"
               htmlFor={id}>{label}</label>
        <input className="form-input"
               type={type || 'text'}
               onChange={e => }
               id={id}
               placeholder={placeholder}/>
        {errorMessages.map(errorMessage => (
          <p className="form-input-hint">The name is invalid.</p>
        ))}
      </div>
    );
  }
}
