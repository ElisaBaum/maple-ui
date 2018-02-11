import {ContentData} from "../../dynamic-content/ContentData";

export interface ApprovalData extends ContentData {

  welcome: string;

  approval: {
    text: string;
    companion: string;
  };

  companions: {
    description: string;
  };

  sitemap: Array<{key: string; icon: string; content: string}>;

}
