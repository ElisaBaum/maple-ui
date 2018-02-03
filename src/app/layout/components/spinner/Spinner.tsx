import * as React from 'react';
import {centered} from "../../decorators/center/center";
import './Spinner.scss';

export const CenteredSpinner = centered(Spinner);

function Spinner() {
  return (
    <div className="spinner"/>
  );
}
