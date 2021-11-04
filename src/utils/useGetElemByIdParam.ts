import { useHistory } from 'react-router';
import { useIdParam } from './useIdParam';

export const useGetElemByIdParam = <T>(list: T[]) => {
  const id = useIdParam();
  const history = useHistory();

  /**
   * usamos el método find del arreglo de elementos para encontrar
   * el elemento que corresponde al id del parámetro de la ruta
   * ejemplo: /details/0
   *      Entre todos los elementos buscamos el que tiene id === 0
   */
  const elem = list.find((elem: any) => {
    // return elem.id === parseInt(id);
    if(elem.id === id) {
      return true;
    } else {
      return false;
    }
  });

  if(!elem) {
    history.push('/404');
  }

  return elem;
}