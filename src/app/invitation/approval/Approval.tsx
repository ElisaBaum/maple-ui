import * as React from 'react';
import {User} from "../../user/User";
import {ApprovalData} from "./ApprovalData";
import {ContentComponentProps} from "../../dynamic-content/ContentContainer";
import {Form} from "../../layout/components/form/Form";
import {FormTextField} from "../../layout/components/form/form-text-field/FormTextField";
import {MAX_LENGTH_PLACEHOLDER} from '../../layout/components/form/validators/MaxLengthValidator';
import {FormButton} from '../../layout/components/form/form-button/FormButton';
import {Item} from '../../layout/components/item/Item';
import {FormSwitch} from '../../layout/components/form/form-switch/FormSwitch';
import {Card} from '../../layout/components/card/Card';
import {Headline} from '../../layout/components/headline/Headline';
import {Icon} from '../../layout/components/icon/Icon';

interface ApprovalProps extends ContentComponentProps<ApprovalData> {
  users: User[];
  maxPersonCount: number;
  newCompanionName?: string;

  addCompanion(name);

  updateCompanion(companion: User);
}

export function Approval(props: ApprovalProps) {
  const {users, maxPersonCount, newCompanionName, addCompanion, updateCompanion} = props;
  const {content: {welcome, description, companions}} = props;
  const isAddCompanionPossible = users && maxPersonCount && users.length < maxPersonCount;

  return (
    <div>
      <Card>
        <Headline text={'Willkommen'} icon={'favorite'}/>
        <Item>{welcome.description}</Item>
      </Card>
      {/*<Card>*/}
        {/*<Item border={false} style={{float: 'left', height: '100%', borderBottom: 0}}>*/}
          {/*<Icon style={{fontSize: '2.4rem'}} name={'favorite'}/>*/}
        {/*</Item>*/}
        {/*<Item>{welcome.description}</Item>*/}
      {/*</Card>*/}
      <Card>
        <Item border={false} style={{float: 'right', height: '100%', borderBottom: 0}}>
          <Icon style={{fontSize: '2.4rem'}} name={'info'}/>
        </Item>
        <Item>{welcome.hints}</Item>
      </Card>
      {/*<Card>*/}
        {/*<Item border={false} style={{float: 'right', height: '100%', borderBottom: 0}}>*/}
          {/*<Icon style={{fontSize: '2.4rem'}} name={'done'}/>*/}
        {/*</Item>*/}
        {/*<Item>*/}
          {/*Teile uns mit ob du zu unserer Hochzeit kommst*/}
        {/*</Item>*/}
      {/*</Card>*/}
      {/*<Card>*/}
        {/*<Item border={false} style={{float: 'left', height: '100%', borderBottom: 0}}>*/}
          {/*<Icon style={{fontSize: '2.4rem'}} name={'info'}/>*/}
        {/*</Item>*/}
        {/*<Item>*/}
          {/*Außerdem findest du Informationen zum Ablauf, zur Anfahrt und zu anderen Themen wie Kleidung, Essen, Geschenken.*/}
        {/*</Item>*/}
      {/*</Card>*/}
      {/*<Card>*/}
        {/*<Item border={false} style={{float: 'right', height: '100%', borderBottom: 0}}>*/}
          {/*<Icon style={{fontSize: '2.4rem'}} name={'done_all'}/>*/}
        {/*</Item>*/}
        {/*<Item>*/}
          {/*hast die Möglichkeit uns deine Musikwünsche mitzuteilen und findest .*/}
        {/*</Item>*/}
      {/*</Card>*/}
      <Card>
        <Item border={false} style={{float: 'left', height: '100%', borderBottom: 0}}>
          <Icon style={{fontSize: '2.4rem'}} name={'done_all'}/>
        </Item>
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

    </div>
  );
}
