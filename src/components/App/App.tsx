import React from 'react';
import './App.css';
import { Link } from '../Link/Link';
import MusicElem from '../MusicElem/MusicElem';
import MusicElemForm from '../MusicElemForm/MusicElemForm';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import MusicElemDetails from '../MusicElemDetails/MusicElemDetails';
import Page404 from '../Page404/Page404';
import { MusicElemObj } from '../../types/MusicElemObj';
import { SongElemObj } from '../../types/SongElemObj';
import { AuthorObj } from '../../types/AuthorObj';
import AuthorsList from '../AuthorsList/AuthorsList';
import AuthorDetails from '../AuthorDetails/AuthorDetails';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../utils/theme';
import { TagOption } from '../../types/TagOption';
import { Bar } from 'react-chartjs-2';
import { getChartData } from '../../utils/getChartData';

function App() {

  const history = useHistory();

  const [ formType, setFormType ] = React.useState<'create' | 'edit'>('create');
  const [ editId, setEditId ] = React.useState<number|null>(null);

  const [ musicElems, setMusicElems ] = React.useState<MusicElemObj[]>([
    {
      id: 0,
      authorId: 0,
      img: 'adasdas',
      title: 'Ching Chang Hon Chi',
      tags: ['test 1', 'test 2'],
      songs: [
        {
          id: 0,
          title: 'La gran canción',
          duration: 10,
        }
      ]
    },
    {
      id: 1,
      authorId: 0,
      img: 'adasdas',
      title: '一決高下(電吉他Remix版)',
      tags: [ 'test 1', 'Animals'],
      songs: []
    },
    {
      id: 2,
      authorId: 1,
      img: 'adasdas',
      title: 'single ladies!',
      tags: ['Animals'],
      songs: []
    },
  ]);

  const [ authors, setAuthors ] = React.useState<AuthorObj[]>([
    {
      id: 0,
      name: 'Dehao Zhang'
    },
    {
      id: 1,
      name: 'Beyonce'
    },
    {
      id: 2,
      name: 'Stephanie'
    },
  ]);

  const [ tagOptions, setTagOptions ] = React.useState<TagOption[]>([
    { label: 'test 1' },
    { label: 'test 2' },
    { label: 'Animals' }
  ]);

  const data = getChartData(musicElems);

  const handleAddTagOption = (newTagOption: TagOption) => {
    setTagOptions([ ...tagOptions, newTagOption ]);
  }

  const handleCreate = (newMusicElem: { img: string, title: string, authorId: number, tags: string[] }) => {
    console.log('nuevo elemento!', newMusicElem);

    const arrayCopy = musicElems.slice(); // crear una copia del arreglo
    arrayCopy.push({ // agregamos el nuevo elemento con la información recibida
      id: Math.random(),
      authorId: newMusicElem.authorId,
      img: newMusicElem.img,
      title: newMusicElem.title,
      tags: newMusicElem.tags,
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
    history.push('/form');
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
    setFormType('create');
    setEditId(null);
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

  /**
   * encontrar elemento interno con id
   */
  const songId = 0;
  let song: SongElemObj|undefined = undefined;
  musicElems.forEach(elem => {
    elem.songs.forEach(songElem => {
      if(songElem.id === songId){
        song = songElem;
      }
    });
  });

  return (<ThemeProvider theme={theme}>
    <div>
      <h2>Hola desde App</h2>

      <nav className="App__nav">
        <Link
          color="light"
          text="Home"
          url="/" />
        <Link
          color="light"
          text="Form"
          url="/form" />
        <Link
          color="light"
          text="List"
          url="/list"></Link>
        <Link
          color="light"
          text="Authors"
          url="/authors"></Link>
      </nav>

      <Switch>
        <Route path="/form">
          <MusicElemForm
            musicElems={musicElems}
            editId={editId}
            type={formType}
            onCreate={handleCreate}
            onEdit={handleEdit}
            authors={authors}
            tagOptions={tagOptions}
            addTagOption={handleAddTagOption}
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


        <Route path="/authors" exact>
          <AuthorsList
            authors={authors}
            />
        </Route>

        <Route path="/authors/:id">
          <AuthorDetails
            authors={authors}
            musicElems={musicElems}
            />
        </Route>


        <Route path="/songs/:id">
        </Route>

        <Route path="/404">
          <Page404 />
        </Route>

        <Route path="/">
          <Bar data={data} options={{
            indexAxis: 'y',
            responsive: true,
            plugins: {
              legend: { display: false, },
              title: { display: true, text: 'Tags Usage', },
            },
          }}/>
        </Route>

        <Redirect to="/404" />
      </Switch>
    </div>
  </ThemeProvider>);
}

export default App;
