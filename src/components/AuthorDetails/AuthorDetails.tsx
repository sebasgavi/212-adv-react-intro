import * as React from 'react';
import { Redirect, useParams } from 'react-router';
import { AuthorObj } from '../../types/AuthorObj';
import { MusicElemObj } from '../../types/MusicElemObj';
import MusicElem from '../MusicElem/MusicElem';

interface AuthorDetailsProps {
  authors: AuthorObj[];
  musicElems: MusicElemObj[];
}

const AuthorDetails: React.FC<AuthorDetailsProps> = ({ authors, musicElems }) => {
  const { id: idString } = useParams<{ id: string }>();
  const id = parseFloat(idString);

  /**
   * usamos el método find del arreglo de autores para encontrar
   * el autor que corresponde al id del parámetro de la ruta
   * ejemplo: /authors/3
   *      Entre todos los autores buscamos el que tiene id === 3
   */
  const author = authors.find((elem) => {
    return elem.id === id;
  });

  if(!author) {
    return <Redirect to="/404" />;
  }

  const authorMusicElems = musicElems.filter((elem) => {
    return elem.authorId === id;
  });

  return (<div>
    <h2>{author.name}</h2>

    <p>Author's albums: {authorMusicElems.length}</p>
    {authorMusicElems.map((elem) => {
      return <MusicElem
        key={elem.id}
        id={elem.id}
        title={elem.title}
        img=""
        type="detail"
      />;
    })}

  </div>);
}

export default AuthorDetails;