import * as React from 'react';
import {ContentContainer} from "../../dynamic-content/ContentContainer";
import {QAndA} from "./QAndA";

export function QAndAContainer() {
  return (
    <ContentContainer contentKey={'q-and-a'} component={QAndA}/>
  );
}
