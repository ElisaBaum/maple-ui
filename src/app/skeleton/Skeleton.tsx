import * as React from 'react';
import {Switch, Route} from 'react-router';
import {JourneyContainer} from "../invitation/journey/JourneyContainer";
import {ApprovalContainer} from "../invitation/approval/ApprovalContainer";
import {RoomReservationContainer} from "../invitation/overnight-stay/RoomReservationContainer";
import {Navigation} from '../layout/components/navigation/Navigation';
import {NavigationItem} from "../layout/components/navigation/NavigationItem";
import {QAndAContainer} from "../invitation/q-and-a/QAndAContainer";
import {ProcedureContainer} from "../invitation/procedure/ProcedureContainer";
import './Skeleton.scss';

export const JOURNEY_PATH = '/journey';
export const APPROVAL_PATH = '/approval';
export const OVERNIGHT_STAY_PATH = '/overnight-stay';
export const Q_AND_A_PATH = '/q-and-a';
export const PROCEDURE_PATH = '/procedure';

export const Skeleton = () => (
  <div className={'skeleton'}>
    <Navigation>
      <NavigationItem target={APPROVAL_PATH} text='Anmeldung'/>
      <NavigationItem target={PROCEDURE_PATH} text='Ablauf'/>
      <NavigationItem target={OVERNIGHT_STAY_PATH} text='Übernachtung'/>
      <NavigationItem target={JOURNEY_PATH} text='Anfahrt'/>
      <NavigationItem target={Q_AND_A_PATH} text='Fragen & Antworten'/>
    </Navigation>
    <Switch>
      <Route path={JOURNEY_PATH} component={JourneyContainer}/>
      <Route path={APPROVAL_PATH} component={ApprovalContainer}/>
      <Route path={OVERNIGHT_STAY_PATH} component={RoomReservationContainer}/>
      <Route path={Q_AND_A_PATH} component={QAndAContainer}/>
      <Route path={PROCEDURE_PATH} component={ProcedureContainer}/>
    </Switch>
  </div>

);
