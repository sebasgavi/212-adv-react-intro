import * as React from 'react';
import { AuthorObj } from '../../types/AuthorObj';
import { MusicElemObj } from '../../types/MusicElemObj';
import { useGetElemByIdParam } from '../../utils/useGetElemByIdParam';
import { useIdParam } from '../../utils/useIdParam';
import MusicElem from '../MusicElem/MusicElem';

interface AuthorDetailsProps {
  authors: AuthorObj[];
  musicElems: MusicElemObj[];
}

const AuthorDetails: React.FC<AuthorDetailsProps> = ({ authors, musicElems }) => {
  const id = useIdParam();
  const author = useGetElemByIdParam(authors);

  const authorMusicElems = musicElems.filter((elem) => {
    return elem.authorId === id;
  });

  return (<div>
    <h2>{author?.name}</h2>

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