import {ContentData} from "../../dynamic-content/ContentData";

export interface ApprovalData extends ContentData {

  greeting: string;
  welcome: string;

  approval: {
    text: string;
    companion: string;
  };

  bugs: {
    icon: string;
    content: string;
    email: string;
  };

  companions: {
    description: string;
  };

  sitemap: Array<{key: string; icon: string; content: string}>;

}
