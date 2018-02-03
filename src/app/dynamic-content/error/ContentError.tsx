import * as React from 'react';
import {Form} from "../../layout/components/form/Form";
import {Item} from "../../layout/components/item/Item";
import {FormButton} from "../../layout/components/form/form-button/FormButton";
import {CenteredError} from "../../layout/components/error/Error";
import {centered} from '../../layout/decorators/center/center';

interface ContentErrorProps {
  reload();
}

export const CenteredContentError = centered(ContentError);

export function ContentError({reload}: ContentErrorProps) {
  return (
    <CenteredError message="Es ist ein Fehler beim Laden aufgetreten.">
      <Form onSubmit={() => reload()}>
        <Item>
          <FormButton type="inverse">Erneut versuchen</FormButton>
        </Item>
      </Form>
    </CenteredError>
  );
}
