import { SongElemObj } from './SongElemObj';

export type MusicElemObj = {
  img: string;
  title: string;
  id: number;

  authorId: number;

  songs: SongElemObj[];
}