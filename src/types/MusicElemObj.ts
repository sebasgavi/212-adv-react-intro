import { SongElemObj } from './SongElemObj';

export type MusicElemObj = {
  img: string;
  title: string;
  id: number;
  tags: string[];

  authorId: number;

  songs: SongElemObj[];
}