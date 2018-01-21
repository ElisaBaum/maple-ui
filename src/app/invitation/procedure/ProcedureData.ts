import {ContentData} from "../../dynamic-content/ContentData";

export interface ProcedureData extends ContentData {

  courseOfEvents: {
    headline: string;
    wedding: string;
    party: string;
  };

}
