import * as React from 'react';
import {Switch, Route} from 'react-router';
import {Header} from "../layout/components/header/Header";
import {Footer} from "../layout/components/footer/footer";
import {JourneyContainer} from "../invitation/journey/JourneyContainer";
import './Skeleton.scss';
import {ApprovalContainer} from "../invitation/approval/ApprovalContainer";

export const Skeleton = () => (
  <div className={'skeleton'}>
    <Header/>
    <div className={'content-area'}>
      <Switch>
        <Route path={'/journey'} component={JourneyContainer}/>
        <Route path={'/approval'} component={ApprovalContainer}/>
      </Switch>
    </div>
    <Footer/>
  </div>

);
