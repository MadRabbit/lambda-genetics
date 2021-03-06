import { Sequence, Population } from '../types';
import { POPULATION_SIZE } from '../config';
import { invoke, mutate } from '../utils';
import cross from '../utils/cross';

export default async ({ winners, generation = 1 }: any) => {
  const [best, rando] = winners as Sequence[];
  const offspring = cross(best, rando);

  const population: Population = new Array(POPULATION_SIZE).fill(null).map(() =>
    mutate(offspring)
  );

  const payload = {
    population,
    generation: generation + 1
  };

  await invoke({
    functionName: 'aggregate',
    payload
  })

  return {
    statusCode: 200,
    body: JSON.stringify(payload)
  }
}
