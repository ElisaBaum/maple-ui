import {ContentData} from "../../dynamic-content/ContentData";

export interface ProcedureData extends ContentData {

  courseOfEvents: {
    headline: string;
    icon: string;
    events: Array<{
      time: string;
      event: string;
    }>;
  };

}
