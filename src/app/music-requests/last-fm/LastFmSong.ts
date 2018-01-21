import {LastFmArtist} from "./LastFmArtist";

export interface LastFmSong {

  name: string;
  artist: string;
  artistInfo?: LastFmArtist;
  url: string;
  listeners: string;
}
