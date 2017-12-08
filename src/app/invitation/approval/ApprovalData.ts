import {ContentData} from "../../dynamic-content/ContentData";

export interface ApprovalData extends ContentData {

  description: string;

  overnightStay: {
    description: string;
    linkText: string;
  };

  companions: {
    description: string;
  };

}
