import * as React from 'react';
import { AuthorObj } from '../../types/AuthorObj';
import { Link } from '../Link/Link';

interface AuthorsListProps {
  authors: AuthorObj[];
}

const AuthorsList: React.FC<AuthorsListProps> = ({ authors }) => {
  
  return (<div>
    <h2>Authors</h2>

    {authors.map((author) => {
      return <Link
        key={author.id}
        text={author.name}
        url={`/authors/${author.id}`}
      />
    })}
  </div>);
}

export default AuthorsList;