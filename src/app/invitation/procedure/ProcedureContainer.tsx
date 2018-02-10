import * as React from 'react';
import {ContentContainer} from "../../dynamic-content/ContentContainer";
import {Procedure} from "./Procedure";

export function ProcedureContainer() {
  return (
    <ContentContainer contentKey={'procedure'} component={Procedure}/>
  );
}
