export interface User {
  id: number;
  partyId: number;
  name: string;
  accepted: boolean;
  scopes?: string[];
}
