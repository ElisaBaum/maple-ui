import {RequestedArtist} from "./RequestedArtist";

export interface RequestedAlbum {

  id: number;
  name: string;
  url: string;
  artist: RequestedArtist;
  imageUrl: string;

}
