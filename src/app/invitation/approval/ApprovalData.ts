import {ContentData} from "../../dynamic-content/ContentData";

export interface ApprovalData extends ContentData {

  description: string;

  companions: {
    description: string;
  };

}
