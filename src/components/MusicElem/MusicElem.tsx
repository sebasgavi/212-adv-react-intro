import * as React from 'react';
import './MusicElem.css';

export interface MusicElemProps {
  img: string;
  title: string;
}

const MusicElem: React.FC<MusicElemProps> = (props) => {
  const [ color, setColor ] = React.useState(255);
  console.log('dentro de MusicElem');
  const r = Math.random(); // en cada renderización va a ser diferente

  const colorStr = `rgb(200, 200, ${color})`;
  const styles: React.CSSProperties = {
    backgroundColor: colorStr,
  };

  const changeColor = () => {
    setColor(Math.floor(Math.random() * 255));
  }

  const [ inputValue, setInputValue ] = React.useState('');

  const handleInput: React.FormEventHandler<HTMLInputElement> = (event: any) => {
    setInputValue(event.target.value);
  }

  return (<article className="MusicElem"
    onClick={changeColor}
    style={styles}>
    <h2>{props.title}</h2>
    <input onChange={handleInput} />
    <br />
    State: {inputValue}
  </article>);
}

export default MusicElem;