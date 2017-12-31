import {Image} from "./MusicImage";

export interface Album {

  name: string;
  artist: string;
  url: string;
  mbid: string;
  image: Image[];

}
