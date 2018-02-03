import * as React from 'react';
import './ContentError.scss';
import {Form} from "../../layout/components/form/Form";
import {Item} from "../../layout/components/item/Item";
import {FormButton} from "../../layout/components/form/form-button/FormButton";
import {Logo} from "../../layout/components/logo/Logo";

interface ContentErrorProps {
  reload();
}

export function ContentError({reload}: ContentErrorProps) {
  return (
    <div className="content-error">
      <Logo className="logo"/>
      <div>Es ist ein Fehler beim Laden aufgetreten.</div>
      <Form onSubmit={() => reload()}>
        <Item>
          <FormButton type="inverse">Erneut versuchen</FormButton>
        </Item>
      </Form>
    </div>
  );
}
