import * as React from 'react';
import {User} from "../../user/User";
import {ApprovalData} from "./ApprovalData";
import {ContentComponentProps} from "../../dynamic-content/ContentContainer";
import {FormCheckbox} from '../../layout/components/form/form-checkbox/FormCheckbox';
import {Form} from "../../layout/components/form/Form";
import {FormTextField} from "../../layout/components/form/form-text-field/FormTextField";
import {MAX_LENGTH_PLACEHOLDER} from '../../layout/components/form/validators/MaxLengthValidator';
import {Paragraph} from "../../layout/components/content/Paragraph";
import {LinkButton} from "../../layout/components/link-button/LinkButton";
import {OVERNIGHT_STAY_PATH} from "../../skeleton/Skeleton";
import {FormButton} from '../../layout/components/form/form-button/FormButton';

interface ApprovalProps extends ContentComponentProps<ApprovalData> {
  users: User[];
  maxPersonCount: number;
  newCompanionName?: string;
  addCompanion(name);
  updateCompanion(companion: User);
}

export function Approval(props: ApprovalProps) {
  const {users, maxPersonCount, newCompanionName, addCompanion, updateCompanion} = props;
  const {content: {description, overnightStay, companions}} = props;
  const isAddCompanionPossible = users && maxPersonCount && users.length < maxPersonCount;

  return (
    <div>
      <Paragraph>
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
      </Paragraph>

      {
        isAddCompanionPossible &&
        <Paragraph>
          <div>{companions.description}</div>
          <Form onSubmit={({isValid, values}) => isValid && addCompanion(values)}>
            <FormTextField name="name"
                           value={newCompanionName || ''}
                           placeholder="Name"
                           maxLength={[255, `Maximale Zeichenlänge überschritten (${MAX_LENGTH_PLACEHOLDER} Zeichen erlaubt)`]}
                           required={'Bitte einen Namen eingeben!'}/>
            <FormButton>Hinzufügen</FormButton>
          </Form>
        </Paragraph>
      }

      <Paragraph>
        <div>{overnightStay.description}</div>
        <LinkButton target={OVERNIGHT_STAY_PATH}>{overnightStay.linkText}</LinkButton>
      </Paragraph>

    </div>
  );
}
