import * as React from 'react';
import { Redirect, Route, useParams } from 'react-router';
import { MusicElemObj } from '../../types/MusicElemObj';
import { SongElemObj } from '../../types/SongElemObj';
import { Link } from '../Link/Link';
import MusicElem from '../MusicElem/MusicElem';
import MusicElemDetailsSongForm from './MusicElemDetailsSongForm';

interface MusicElemDetailsProps {
  list: MusicElemObj[];
  onCreateSong: (musicElemId: number, newSongElem: SongElemObj) => void;
}

const MusicElemDetails: React.FC<MusicElemDetailsProps> = ({ list, onCreateSong }) => {
  const { id: idString } = useParams<{ id: string }>();
  const id = parseFloat(idString);

  /**
   * usamos el método find del arreglo de elementos para encontrar
   * el elemento que corresponde al id del parámetro de la ruta
   * ejemplo: /details/0
   *      Entre todos los elementos buscamos el que tiene id === 0
   */
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