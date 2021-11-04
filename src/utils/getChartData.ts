import { MusicElemObj } from '../types/MusicElemObj';

export const getChartData = (musicElems: MusicElemObj[]) => {
  const counters: {[key: string]: number} = {};
  musicElems.forEach((me) => {
    me.tags.forEach((tag) => {
      if(counters[tag]) {
        counters[tag]++;
      } else {
        counters[tag] = 1;
      }
    });
  });
  return {
    labels: Object.keys(counters),
    datasets: [
      {
        data: Object.values(counters),
        backgroundColor: [ 'rgba(54, 162, 235, 0.2)' ],
        borderColor: [ 'rgba(54, 162, 235, 1)' ],
      },
    ],
  };
}