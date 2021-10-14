import * as React from 'react';
import { useHistory } from 'react-router';
import { SongElemObj } from '../../types/SongElemObj';

interface MusicElemDetailsSongFormProps {
  onCreate: (newSongElem: SongElemObj) => void; // evento propio que se dispara al crear un elemento
}

const MusicElemDetailsSongForm: React.FC<MusicElemDetailsSongFormProps> = ({ onCreate }) => {
  const history = useHistory();

  const [ title, setTitle ] = React.useState('');
  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.target.value);
  }

  const [ duration, setDuration ] = React.useState('');
  const handleDurationChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setDuration(event.target.value);
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const newSongElem: SongElemObj = {
      id: Math.random(),
      title: title,
      duration: parseInt(duration),
    }
    onCreate(newSongElem);
    history.goBack();
  }
  
  return (<form onSubmit={handleSubmit}>
    <input
      type="text"
      onChange={handleTitleChange}
      value={title}
      />
    <input
      type="number"
      onChange={handleDurationChange}
      value={duration}
    />
    <button>
      add song
    </button>
  </form>);
}

export default MusicElemDetailsSongForm;