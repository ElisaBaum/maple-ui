import {ContentData} from "../dynamic-content/ContentData";

export interface MusicRequestsData extends ContentData {

  description: string;
  hint: string;
  lastFmApiKey: string;
  maxRequests: {
    count: number;
    hint: string;
  };
}
