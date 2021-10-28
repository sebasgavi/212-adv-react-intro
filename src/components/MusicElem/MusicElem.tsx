import * as React from 'react';
import { useHistory } from 'react-router-dom';
import './MusicElem.css';

export interface MusicElemProps {
  id: number;
  img: string;
  title: string;
  type: 'detail'|'edit';
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
}

const MusicElem: React.FC<MusicElemProps> = ({ id, img, title, onDelete, onEdit, type }) => {
  // const { img, title } = props;

  // const img = props.img;
  // const title = props.title;

  const [ color ] = React.useState( Math.floor(Math.random() * 255) );
  const colorStr = `rgb(200, 200, ${color})`;
  const history = useHistory();

  const styles: React.CSSProperties = {
    backgroundColor: colorStr,
    backgroundImage: img,
  };

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
    if(onDelete) {
      onDelete(id);
    }
  }

  const handleEdit: React.MouseEventHandler<HTMLButtonElement> = () => {
    if(onEdit) {
      onEdit(id);
    }
  }

  const handleView: React.MouseEventHandler<HTMLButtonElement> = () => {
    history.push(`/details/${id}`);
  }

  return (<article className="MusicElem"
    style={styles}>
    <h2>{title}</h2>
    {type === 'edit' && <div>
      <button onClick={handleView}>view</button>
      {onDelete && <button onClick={handleDelete}>delete</button>}
      {onEdit && <button onClick={handleEdit}>edit</button>}
    </div>}
  </article>);
}

export default MusicElem;