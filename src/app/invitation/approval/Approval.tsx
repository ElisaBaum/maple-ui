import * as React from 'react';
import {User} from "../../user/User";
import {ApprovalData} from "./ApprovalData";
import {ContentComponentProps} from "../../dynamic-content/ContentContainer";
import 'spectre.css';
import {FormCheckbox} from '../../layout/components/form/form-checkbox/FormCheckbox';
import {Form} from "../../layout/components/form/Form";
import {FormField} from "../../layout/components/form/form-field/FormField";
import {Button} from "../../layout/components/button/Button";

interface ApprovalProps extends ContentComponentProps<ApprovalData> {
  users: User[];
  addCompanion(name: string);
}

export function Approval({users, addCompanion, content: {description, companions}}: ApprovalProps) {
  return (
    <div>
      <div>{description}</div>
      {
        users &&
        users.map((user, index) =>
          (<FormCheckbox key={index} name={user.name}/>)
        )
      }
      <div>{companions.description}</div>
      <Form onSubmit={({isValid, values}) => isValid && addCompanion(values)}>
        <FormField name="name"
                   placeholder="Name"
                   required={'Bitte Name eingeben!'} />
        <Button htmlType="submit">Hinzufügen</Button>
      </Form>
    </div>
  );
}
