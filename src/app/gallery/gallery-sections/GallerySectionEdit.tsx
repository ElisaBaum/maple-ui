import * as React from 'react';
import {Form} from '../../layout/components/form/Form';
import {FormTextField} from '../../layout/components/form/form-text-field/FormTextField';

export const GallerySectionEdit = ({section, onCreateSection}) => (
  <Form values={section}
        onSubmit={({isValid, values}) => isValid && onCreateSection(values)}>
    <FormTextField name="name"
                   label="Section-Name"
                   required={'Bitte Section-Namen eingeben!'}/>
  </Form>
);
