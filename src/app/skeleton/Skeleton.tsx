import * as React from 'react';
import {Switch, Route} from 'react-router';
import {JourneyContainer} from "../invitation/journey/JourneyContainer";
import {ApprovalContainer} from "../invitation/approval/ApprovalContainer";
import './Skeleton.scss';
import {RoomReservationContainer} from "../invitation/overnight-stay/RoomReservationContainer";
import {LayoutTest} from '../layout/LayoutTest';
import {Navigation} from '../layout/components/navigation/Navigation';

export const JOURNEY_PATH = '/journey';
export const APPROVAL_PATH = '/approval';
export const OVERNIGHT_STAY_PATH = '/overnight-stay';

export const Skeleton = () => (
  <div className={'skeleton'}>
    <Navigation />
    <Switch>
      <Route path={JOURNEY_PATH} component={JourneyContainer}/>
      <Route path={APPROVAL_PATH} component={ApprovalContainer}/>
      <Route path={OVERNIGHT_STAY_PATH} component={RoomReservationContainer}/>
      <Route path={'/layout'} component={LayoutTest}/>
    </Switch>
  </div>

);
