import React from 'react';
import './App.css';
import { Link } from '../Link/Link';
import MusicElem, { MusicElemProps } from '../MusicElem/MusicElem';
import MusicElemForm from '../MusicElemForm/MusicElemForm';

type MusicElemObj = {
  img: string;
  title: string;
  id: number;
}

function App() {

  const [ musicElems, setMusicElems ] = React.useState<MusicElemObj[]>([
    {
      id: 0,
      img: 'adasdas',
      title: 'Nuevo elemento'
    },
  ]);

  const handleCreate = (newMusicElem: { img: string, title: string }) => {
    console.log('nuevo elemento!', newMusicElem);

    const arrayCopy = musicElems.slice(); // crear una copia del arreglo
    arrayCopy.push({ // agregamos el nuevo elemento con la información recibida
      id: Math.random(),
      img: newMusicElem.img,
      title: newMusicElem.title,
    });

    // creamos un nuevo arreglo
    const newArray = [
      ...musicElems, // ponemos todos los elementos que ya existían
      { // agregamos el nuevo elemento con la información recibida
        id: Math.random(),
        img: newMusicElem.img,
        title: newMusicElem.title
      }
    ];
    setMusicElems(arrayCopy);
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

  return (
    <div>
      <h2>Hola desde App</h2>

      <nav className="App__nav">
        <Link
          text="Docs"
          url="https://reactjs.org/docs/getting-started.html"
          active />
        <Link
          text="Tutorial"
          url="https://reactjs.org/tutorial/tutorial.html"></Link>
        <Link
          text="Blog"
          url="https://reactjs.org/blog/"></Link>
        <Link
          text="Community"
          url="https://reactjs.org/community/support.html"></Link>
      </nav>

      <MusicElemForm
        type="create"
        onCreate={handleCreate}
      />

      {musicElems.map((elem) => {
        return <MusicElem
          key={elem.id}
          id={elem.id}
          title={elem.title}
          img=""
          onDelete={handleDelete}
        />;
      })}
    </div>
  );
}

export default App;
