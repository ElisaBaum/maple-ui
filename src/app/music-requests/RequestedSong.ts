import {RequestedArtist} from "./RequestedArtist";

export interface RequestedSong {

  id: number;
  name: string;
  url: string;
  artist: RequestedArtist;

}
