import * as React from 'react';
import { Route } from 'react-router';
import { MusicElemObj } from '../../types/MusicElemObj';
import { SongElemObj } from '../../types/SongElemObj';
import { useGetElemByIdParam } from '../../utils/useGetElemByIdParam';
import { useIdParam } from '../../utils/useIdParam';
import { Link } from '../Link/Link';
import MusicElem from '../MusicElem/MusicElem';
import MusicElemDetailsSongForm from './MusicElemDetailsSongForm';

interface MusicElemDetailsProps {
  list: MusicElemObj[];
  onCreateSong: (musicElemId: number, newSongElem: SongElemObj) => void;
}

const MusicElemDetails: React.FC<MusicElemDetailsProps> = ({ list, onCreateSong }) => {
  const id = useIdParam();
  const elem = useGetElemByIdParam(list);

  if(!elem) return null;
  const { title, img, songs } = elem;

  const handleCreateSongElem = (newSongElem: SongElemObj) => {
    console.log(newSongElem);
    onCreateSong(id, newSongElem);
  }

  return (<div>

    <Route path="/details/:id">
      <MusicElem
        title={title}
        img={img}
        id={id}
        type="detail"
      />

      <h2>Total songs: {songs.length}</h2>

      <ol>
        {songs.map((songElem) => {
          return <li key={songElem.id}>
            <Link url={`/songs/${songElem.id}`} text={`${songElem.title} - ${songElem.duration}`} />
          </li>
        })}
      </ol>

      <Link url={`/details/${id}/new-song`} text="Add song"></Link>
    </Route>

    <Route path="/details/:id/new-song">
      <MusicElemDetailsSongForm
        onCreate={handleCreateSongElem}
      />
    </Route>


  </div>);
}

export default MusicElemDetails;