import * as React from 'react';
import './MusicElem.css';

export interface MusicElemProps {
  img: string;
  title: string;
}

const MusicElem: React.FC<MusicElemProps> = ({ img, title }) => {
  // const { img, title } = props;

  // const img = props.img;
  // const title = props.title;

  const [ color, setColor ] = React.useState( Math.floor(Math.random() * 255) );
  const colorStr = `rgb(200, 200, ${color})`;

  const styles: React.CSSProperties = {
    backgroundColor: colorStr,
    backgroundImage: img,
  };

  return (<article className="MusicElem"
    style={styles}>
    <h2>{title}</h2>
  </article>);
}

export default MusicElem;