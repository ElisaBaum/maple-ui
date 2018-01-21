import * as React from 'react';
import {ContentComponentProps} from "../../dynamic-content/ContentContainer";
import {ProcedureData} from "./ProcedureData";
import {Headline} from "../../layout/components/headline/Headline";
import {Card} from '../../layout/components/card/Card';
import {Item} from "../../layout/components/item/Item";

export function Procedure({content}: ContentComponentProps<ProcedureData>) {
  const {courseOfEvents} = content;
  return (
    <div className="procedure">
      <Card>
        <Headline text={courseOfEvents.headline}/>
        <Item>
          {courseOfEvents.wedding}
        </Item>
        <Item>
          {courseOfEvents.party}
        </Item>
      </Card>
    </div>
  );
}
