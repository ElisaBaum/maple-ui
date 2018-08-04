import * as React from 'react';
import {Route, Switch} from 'react-router';
import {ApprovalContainer} from "../invitation/approval/ApprovalContainer";
import {Navigation} from '../layout/components/navigation/Navigation';
import {NavigationItem} from "../layout/components/navigation/NavigationItem";
import {QAndAContainer} from "../invitation/q-and-a/QAndAContainer";
import {ProcedureContainer} from "../invitation/procedure/ProcedureContainer";
import {NotFound} from "../not-found/NotFound";
import './Skeleton.scss';
import {Gallery} from '../gallery/Gallery';

export const JOURNEY_PATH = '/journey';
export const GALLERY_PATH = '/gallery';
export const APPROVAL_PATH = '/approval';
export const OVERNIGHT_STAY_PATH = '/overnight-stay';
export const MUSIC_REQUESTS_PATH = '/music-requests';
export const Q_AND_A_PATH = '/q-and-a';
export const PROCEDURE_PATH = '/procedure';

export const Skeleton = () => (
  <div className={'skeleton'}>
    <Navigation>
      <NavigationItem target={GALLERY_PATH} text='Fotos'/>
      <NavigationItem target={PROCEDURE_PATH} text='Ablauf'/>
      <NavigationItem target={Q_AND_A_PATH} text='Fragen & Antworten'/>
      <NavigationItem target={APPROVAL_PATH} text='Anmeldung'/>
    </Navigation>
    <Switch>
      <Route path={GALLERY_PATH} component={Gallery}/>
      <Route path={APPROVAL_PATH} component={ApprovalContainer}/>
      <Route path={Q_AND_A_PATH} component={QAndAContainer}/>
      <Route path={PROCEDURE_PATH} component={ProcedureContainer}/>
      <Route component={NotFound}/>
    </Switch>
  </div>

);
