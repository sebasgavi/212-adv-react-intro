import React from 'react';
import './App.css';
import { Link } from '../Link/Link';
import MusicElem, { MusicElemProps } from '../MusicElem/MusicElem';
import MusicElemForm from '../MusicElemForm/MusicElemForm';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import MusicElemDetails from '../MusicElemDetails/MusicElemDetails';
import Page404 from '../Page404/Page404';
import { MusicElemObj } from '../../types/MusicElemObj';
import { SongElemObj } from '../../types/SongElemObj';

function App() {

  const [ formType, setFormType ] = React.useState<'create' | 'edit'>('create');
  const [ editId, setEditId ] = React.useState<number|null>(null);

  const [ musicElems, setMusicElems ] = React.useState<MusicElemObj[]>([
    {
      id: 0,
      img: 'adasdas',
      title: 'Nuevo elemento',
      songs: [
        {
          id: 0,
          title: 'La gran canción',
          duration: 10,
        }
      ]
    },
  ]);

  const handleCreate = (newMusicElem: { img: string, title: string }) => {
    console.log('nuevo elemento!', newMusicElem);

    const arrayCopy = musicElems.slice(); // crear una copia del arreglo
    arrayCopy.push({ // agregamos el nuevo elemento con la información recibida
      id: Math.random(),
      img: newMusicElem.img,
      title: newMusicElem.title,
      songs: [],
    });

    // creamos un nuevo arreglo
    /* const newArray = [
      ...musicElems, // ponemos todos los elementos que ya existían
      { // agregamos el nuevo elemento con la información recibida
        id: Math.random(),
        img: newMusicElem.img,
        title: newMusicElem.title
      }
    ]; */
    setMusicElems(arrayCopy);
  }

  const handleBeginEdit = (editId: number) => {
    setEditId(editId);
    setFormType('edit');
  }

  const handleEdit = (editId: number, editMusicElem: { title: string }) => {
    console.log(editId, editMusicElem);

    const musicElemsCopy = musicElems.slice();
    const editIndex = musicElems.findIndex((elem) => {
      if(elem.id === editId) {
        return true;
      }
      return false;
    });

    /* musicElemsCopy[editIndex] = {
      id: musicElems[editIndex].id,
      img: musicElems[editIndex].img,
      title: editMusicElem.title,
    } */
    musicElemsCopy[editIndex] = {
      ...musicElems[editIndex],
      ...editMusicElem,
    }

    setMusicElems(musicElemsCopy);
  }

  const handleDelete = (deleteId: number) => {
    console.log('delete')
    /* const musicElemsCopy = musicElems.slice(); // creamos la copia
    musicElemsCopy.splice(0, 1); // modificamos la copia, el original sigue igual
    setMusicElems(musicElemsCopy); // seteamos el estado con la copia */

    const musicElemsCopy = musicElems.filter((elem) => {
      if(elem.id === deleteId) {
        return false;
      } else {
        return true;
      }
    });
    setMusicElems(musicElemsCopy);
  }

  const handleCreateSong = (musicElemId: number, newSongElem: SongElemObj) => {

    const musicElemsCopy = musicElems.slice();
    const editIndex = musicElems.findIndex((elem) => {
      if(elem.id === musicElemId) {
        return true;
      }
      return false;
    });

    musicElemsCopy[editIndex] = {
      ...musicElems[editIndex],
      songs: [
        ...musicElems[editIndex].songs,
        newSongElem
      ]
    }

    setMusicElems(musicElemsCopy);
  }

  return (
    <HashRouter>
      <div>
        <h2>Hola desde App</h2>

        <nav className="App__nav">
          <Link
            text="Form"
            url="/form" />
          <Link
            text="List"
            url="/list"></Link>
        </nav>

        <Switch>
          <Route path="/form">
            <MusicElemForm
              editId={editId}
              type={formType}
              onCreate={handleCreate}
              onEdit={handleEdit}
            />
          </Route>

          <Route path="/list">
            {musicElems.map((elem) => {
              return <MusicElem
                key={elem.id}
                id={elem.id}
                title={elem.title}
                img=""
                type="edit"
                onDelete={handleDelete}
                onEdit={handleBeginEdit}
              />;
            })}
          </Route>

          <Route path="/details/:id">
            <MusicElemDetails
              list={musicElems}
              onCreateSong={handleCreateSong}
              />
          </Route>

          <Route path="/404">
            <Page404 />
          </Route>

          <Redirect to="/404" />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
