import * as React from 'react';
import {Form} from './components/form/Form';
import {FormTextField} from './components/form/form-text-field/FormTextField';
import {FormCheckbox} from './components/form/form-checkbox/FormCheckbox';
import {FormButton} from './components/form/form-button/FormButton';
import {LinkButton} from './components/link-button/LinkButton';

const noop = () => null;

export function LayoutTest() {
  return (
    <div>
      <Form onSubmit={noop}>
        <FormTextField name={'name'} placeholder={'Name'}/>
        <FormTextField name={'age'} placeholder={'Age'}/>
        <FormCheckbox name={'isAdmin'}/>
        <FormButton>Save</FormButton>
      </Form>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book.
        <LinkButton target={'/layout'}>Link to here</LinkButton>
      </p>
    </div>
  );
}


/*

- form
  - input
    - radio
    - text
    - checkbox
  - form button
- button
- link button
- auto complete
- text/paragraph
- toast

 */
