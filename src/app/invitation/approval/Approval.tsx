import * as React from 'react';
import {User} from "../../user/User";
import {ApprovalData} from "./ApprovalData";
import {ContentComponentProps} from "../../dynamic-content/ContentContainer";
import {FormCheckbox} from '../../layout/components/form/form-checkbox/FormCheckbox';
import {Form} from "../../layout/components/form/Form";
import {FormField} from "../../layout/components/form/form-field/FormField";
import {Button} from "../../layout/components/button/Button";
import {MAX_LENGTH_PLACEHOLDER} from '../../layout/components/form/validators/MaxLengthValidator';
import 'spectre.css';

interface ApprovalProps extends ContentComponentProps<ApprovalData> {
  users: User[];
  addCompanion(name: string);
  updateCompanion(companion: User);
}

export function Approval({users, addCompanion, updateCompanion, content: {description, companions}}: ApprovalProps) {
  return (
    <div>
      <div>{description}</div>
      {
        users &&
        users.map((user, index) =>
          (<FormCheckbox key={index}
                         name={user.name}
                         onChange={({value}) => updateCompanion({...user, accepted: value})}
                         value={user.accepted}/>)
        )
      }
      <div>{companions.description}</div>
      <Form onSubmit={({isValid, values}) => isValid && addCompanion(values)}>
        <FormField name="name"
                   placeholder="Name"
                   maxLength={[5, `Maximale Zeichenlänge überschritten (${MAX_LENGTH_PLACEHOLDER} Zeichen erlaubt)`]}
                   required={'Bitte Name eingeben!'}/>
        <Button htmlType="submit">Hinzufügen</Button>
      </Form>
    </div>
  );
}
