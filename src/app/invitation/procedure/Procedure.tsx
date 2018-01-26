import * as React from 'react';
import {ContentComponentProps} from "../../dynamic-content/ContentContainer";
import {ProcedureData} from "./ProcedureData";
import {Headline} from "../../layout/components/headline/Headline";
import {Card} from '../../layout/components/card/Card';
import {Item} from "../../layout/components/item/Item";
import {Timeline} from "../../layout/components/timeline/Timeline";
import {TimelineItem} from "../../layout/components/timeline/TimelineItem";
import {TimeItem} from "../../layout/components/timeline/TimeItem";

export function Procedure({content}: ContentComponentProps<ProcedureData>) {
  const {courseOfEvents} = content;
  return (
    <div className="procedure">
      <Card>
        <Headline text={courseOfEvents.headline}/>
        <Item>
          <Timeline>
            {
              courseOfEvents.events.map((event, index) => (
                <TimelineItem key={index}>
                  <TimeItem>{event.time}</TimeItem>
                  <div>{event.event}</div>
                </TimelineItem>
              ))
            }
          </Timeline>
        </Item>
      </Card>
    </div>
  );
}
