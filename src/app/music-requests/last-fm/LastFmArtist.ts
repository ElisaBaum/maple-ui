import {LastFmMusicImage} from "./LastFmMusicImage";

export interface LastFmArtist {

  name: string;
  url: string;
  listeners: string;
  mbid: string;
  image: LastFmMusicImage[];

}
