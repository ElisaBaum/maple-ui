import {ContentData} from "../../dynamic-content/ContentData";

export interface QAndAData extends ContentData {

  questions: Array<{
    question: string;
    answer: string[];
    icon: string;
  }>;

}
