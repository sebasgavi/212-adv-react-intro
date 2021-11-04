import { useParams } from 'react-router';

export const useIdParam = () => {
  const { id: idString } = useParams<{ id: string }>();
  const id = parseFloat(idString);

  return id;
}