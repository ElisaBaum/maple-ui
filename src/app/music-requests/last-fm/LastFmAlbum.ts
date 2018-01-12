import {LastFmMusicImage} from "./LastFmMusicImage";
import {LastFmArtist} from "./LastFmArtist";

export interface LastFmAlbum {

  name: string;
  artist: string;
  artistInfo?: LastFmArtist;
  url: string;
  mbid: string;
  image: LastFmMusicImage[];

}
