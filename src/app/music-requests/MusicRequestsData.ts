import {ContentData} from "../dynamic-content/ContentData";

export interface MusicRequestsData extends ContentData {

  contentTitle: {
    title: string;
    icon: string;
  };

  description: string;
  hint: string;
  lastFmApiKey: string;
  maxRequests: {
    count: number;
    hint: string;
  };
}
