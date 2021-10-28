import { Button } from '@mui/material';
import * as React from 'react';
import { useHistory } from 'react-router';
import { AuthorObj } from '../../types/AuthorObj';
import './MusicElemForm.css';

interface MusicElemFormProps {
  editId: number|null;
  type: 'create'|'edit';
  onCreate: (newMusicElem: { title: string, img: string, authorId: number }) => void; // evento propio que se dispara al crear un elemento
  onEdit: (id: number, editMusicElem: { title: string }) => void; // evento propio que se dispara al crear un elemento
  authors: AuthorObj[];
}

const MusicElemForm: React.FC<MusicElemFormProps> = ({ editId, type, onCreate, onEdit, authors }) => {
  const history = useHistory();

  // estado para guardar si el usuario ya intentó enviar el formulario, por defecto es falso
  const [ formSubmitted, setFormSubmitted ] = React.useState(false);

  // estado para guardar el valor del input title
  const [ title, setTitle ] = React.useState('');
  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.target.value);
  }

  // estado para guardar el valor del input url
  const [ url, setUrl ] = React.useState('');
  const handleUrlChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUrl(event.target.value);
  }

  // estado para guardar el valor del input subscribers
  const [ subscribers, setSubscribers ] = React.useState('');
  const handleSubscribersChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    const allDigitsRegExp = /^\d*$/;
    if(allDigitsRegExp.test(value)) {
      setSubscribers(value);
    }
  }

  // estado para guardar el valor del autor
  const [ author, setAuthor ] = React.useState(0);
  const handleAuthorChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setAuthor(parseFloat(event.target.value));
  }

  // boolean de validación
  const isTitleValid = title.length >= 5 && title.length <= 10;
  const isUrlValid = url.length >= 10;
  const isSubscribersValid = parseInt(subscribers) >= 100;

  // event handler para el submit
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: any) => {
    event.preventDefault();
    setFormSubmitted(true); // si el usuario intenta enviar el formulario, el booleano pasa a true
    // condición para saber si todos los campos son válidos
    if(type === 'create' && isTitleValid && isUrlValid) {
      console.log('valid');
      // si el formulario es válido, llamamos al evento onCreate
      onCreate({
        img: url,
        title: title,
        authorId: author
      });
      setTitle('');
      setUrl('');
      setSubscribers('');
      setAuthor(0);
      setFormSubmitted(false);
      history.push('/list');
    } else if (type === 'edit' && isTitleValid) {
      onEdit(editId!, { title: title });
    } else {
      console.log('invalid');
    }
  }

  return (<form className="MusicElemForm"
    onSubmit={handleSubmit}>

    <h2>{type === 'create' ? 'New' : 'Edit'} MusicElem {editId}</h2>

    <label>
      Title
      <input type="text"
        onChange={handleTitleChange}
        value={title} />
      {/* condición para mostrar el error si ya intentó enviar el formulario y este campo es inválido */}
      {(formSubmitted && !isTitleValid) &&
        <p className="MusicElemForm__error">Title must be at least 5 characters long</p>
      }
    </label>

    {type === 'create' && <label>
      Image URL
      <input type="text"
        onChange={handleUrlChange}
        value={url} />
      {(formSubmitted && !isUrlValid) &&
        <p className="MusicElemForm__error">The URL must be at least 10 characters long</p>
      }
    </label>}

    <label>
      Subscribers Count
      <input type="text"
        onChange={handleSubscribersChange}
        value={subscribers} />
      {(formSubmitted && !isSubscribersValid) &&
        <p className="MusicElemForm__error">Must have at least 100 subscribers</p>
      }
    </label>

    <label>
      Author
      <select
        onChange={handleAuthorChange}
        value={author}
        >
        {authors.map(author => {
          return <option
            key={author.id}
            value={author.id}
            >
            {author.name}
          </option>
        })}
      </select>
      {(formSubmitted && !isSubscribersValid) &&
        <p className="MusicElemForm__error">Must have at least 100 subscribers</p>
      }
    </label>

    <Button type="submit" variant="contained" color="secondary" size="medium">
      Medium
    </Button>

    <button>
      {type === 'create' ? 'Create new MusicElem' : 'Save changes'}
    </button>

  </form>);
}

export default MusicElemForm;