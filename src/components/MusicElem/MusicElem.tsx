import * as React from 'react';
import './MusicElem.css';

export interface MusicElemProps {
  id: number;
  img: string;
  title: string;
  onDelete: (id: number) => void;
}

const MusicElem: React.FC<MusicElemProps> = ({ id, img, title, onDelete }) => {
  // const { img, title } = props;

  // const img = props.img;
  // const title = props.title;

  const [ color, setColor ] = React.useState( Math.floor(Math.random() * 255) );
  const colorStr = `rgb(200, 200, ${color})`;

  const styles: React.CSSProperties = {
    backgroundColor: colorStr,
    backgroundImage: img,
  };

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
    onDelete(id);
  }

  return (<article className="MusicElem"
    style={styles}>
    <h2>{title}</h2>
    <button onClick={handleDelete}>delete</button>
  </article>);
}

export default MusicElem;