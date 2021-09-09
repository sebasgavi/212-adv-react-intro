import React from 'react';
import './App.css';
import { Link } from '../Link/Link';
import MusicElem, { MusicElemProps } from '../MusicElem/MusicElem';

type MusicElemObj = MusicElemProps & {
  id: number;
}

const musicElems: MusicElemObj[] = [
  {
    id: Math.random(),
    title: 'Otro título',
    img: '',
  },
  {
    id: Math.random(),
    title: 'Título edit',
    img: ''
  },
  {
    id: Math.random(),
    title: 'Otra cosa',
    img: '',
  },
  {
    id: Math.random(),
    title: 'Una cuarta cosa',
    img: '',
  },
  {
    id: Math.random(),
    title: 'La quinta',
    img: '',
  },
  {
    id: Math.random(),
    title: 'Última',
    img: '',
  },
];

function App() {

  const [ count, setCount ] = React.useState(0);
  React.useEffect(() => {
    setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
  }, []);

  console.log('render');

  return (
    <div>
      <h2>Hola desde App {count}</h2>

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

      {musicElems.map((elem) => {
        return <MusicElem key={elem.id} title={elem.title} img="" />;
      })}
    </div>
  );
}

export default App;
