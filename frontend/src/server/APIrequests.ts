import { IArticles } from '../types/commonTypes';
import server from './server';

export async function getPm25ForUsersLocation(latitude: number, longitude: number): Promise<number> {
  const response = await server.get('/measures', {
    params: {
      location: `${latitude},${longitude}`,
      limit: 10,
    },
  });

  //TODO add adapter

  return 0;
}

export async function getArticles(pm25value: number): Promise<IArticles> {
  const response = await server.get('/articles', {
    params: {
      pm25value,
    },
  });

  //TODO add adapter

  return {};
}
