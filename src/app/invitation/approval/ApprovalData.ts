import {ContentData} from "../../dynamic-content/ContentData";

export interface ApprovalData extends ContentData {

  welcome: {
    description: string;
    hints: string;
  };

  description: string;

  companions: {
    description: string;
  };

}
