import * as React from 'react';
import {User} from "../../user/User";
import {ApprovalData} from "./ApprovalData";
import {ContentComponentProps} from "../../dynamic-content/ContentContainer";
import {Form} from "../../layout/components/form/Form";
import {FormTextField} from "../../layout/components/form/form-text-field/FormTextField";
import {MAX_LENGTH_PLACEHOLDER} from '../../layout/components/form/validators/MaxLengthValidator';
import {LinkButton} from "../../layout/components/link-button/LinkButton";
import {OVERNIGHT_STAY_PATH} from "../../skeleton/Skeleton";
import {FormButton} from '../../layout/components/form/form-button/FormButton';
import {Item} from '../../layout/components/item/Item';
import {FormSwitch} from '../../layout/components/form/form-switch/FormSwitch';
import {Card} from '../../layout/components/card/Card';

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
      <Card>
        <Item>{description}</Item>
        {
          users &&
          users.map((user, index) =>
            (<FormSwitch key={index}
                         name={user.name}
                         onChange={({value}) => updateCompanion({...user, accepted: value})}
                         value={user.accepted}/>)
          )
        }
      </Card>
        {
          isAddCompanionPossible &&
          <Card>
            <Item>
              <div>{companions.description}</div>
            </Item>
            <Form onSubmit={({isValid, values}) => isValid && addCompanion(values)}>
              <FormTextField name="name"
                             value={newCompanionName || ''}
                             label="Name"
                             maxLength={[255, `Maximale Zeichenlänge überschritten (${MAX_LENGTH_PLACEHOLDER} Zeichen erlaubt)`]}
                             required={'Bitte einen Namen eingeben!'}/>
              <Item>
                <FormButton>Hinzufügen</FormButton>
              </Item>
            </Form>
          </Card>
        }
      <Card>
        <Item>{overnightStay.description}</Item>
        <Item>
          <LinkButton target={OVERNIGHT_STAY_PATH}>{overnightStay.linkText}</LinkButton>
        </Item>
      </Card>

    </div>
  );
}
