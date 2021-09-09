import * as React from 'react';
import './MusicElem.css';

export interface MusicElemProps {
  img: string;
  title: string;
}

const MusicElem: React.FC<MusicElemProps> = (props) => {
  const [ color, setColor ] = React.useState('red');
  console.log('dentro de MusicElem');
  const r = Math.random(); // en cada renderización va a ser diferente

  const styles: React.CSSProperties = {
    backgroundColor: color,
  };

  const changeColor = () => {
    setColor(`rgb(200, 200, ${Math.floor(Math.random() * 255)})`);
  }

  return (<article className="MusicElem"
    onClick={changeColor}
    style={styles}>
    <h2>{props.title}</h2>
  </article>);
}

export default MusicElem;