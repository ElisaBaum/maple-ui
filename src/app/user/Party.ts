import {User} from "./User";

export interface Party {
  id: number;
  maxPersonCount: number;
  users: User[];
}
