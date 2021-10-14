import * as React from 'react';
import { Redirect, Route, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { MusicElemObj } from '../../types/MusicElemObj';
import { SongElemObj } from '../../types/SongElemObj';
import MusicElem from '../MusicElem/MusicElem';
import MusicElemDetailsSongForm from './MusicElemDetailsSongForm';

interface MusicElemDetailsProps {
  list: MusicElemObj[];
  onCreateSong: (musicElemId: number, newSongElem: SongElemObj) => void;
}

const MusicElemDetails: React.FC<MusicElemDetailsProps> = ({ list, onCreateSong }) => {
  const { id: idString } = useParams<{ id: string }>();
  const id = parseFloat(idString);

  const elem = list.find((elem) => {
    // return elem.id === parseInt(id);
    if(elem.id === id) {
      return true;
    } else {
      return false;
    }
  });

  if(!elem) {
    return <Redirect to="/404" />;
  }
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
        {songs.map(songElem => {
          return <li key={songElem.id}>{songElem.title} - {songElem.duration}</li>
        })}
      </ol>

      <Link to={`/details/${id}/new-song`}>Add song</Link>
    </Route>

    <Route path="/details/:id/new-song">
      <MusicElemDetailsSongForm
        onCreate={handleCreateSongElem}
      />
    </Route>


  </div>);
}

export default MusicElemDetails;