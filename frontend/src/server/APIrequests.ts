import { IArticles, IPm25LocationMeasures } from '@tc/types/commonTypes';
import server from './server';

interface IMeasuresResponse {
  country: string;
  country_alpha: string;
  city: string;
  date_from: string;
  date_to: string;
  results: {
    value: string;
    date: string;
  };
}

export async function getPm25ForUsersLocation(latitude: number, longitude: number): Promise<IPm25LocationMeasures> {
  const response: IMeasuresResponse = await server.get('/measures', {
    params: {
      location: `${latitude},${longitude}`,
      limit: 10,
    },
  });

  const {
    city,
    country,
    results: { value: pm25 },
  } = response;

  return {
    city,
    country,
    pm25,
  };
}

export async function getArticles(params: IPm25LocationMeasures): Promise<IArticles> {
  const response: Record<string, string> = await server.get('/articles', {
    params: params,
  });

  return {
    shortTermHealth: response['short-term'],
    longTermHealth: response['long-term'],
    environment: response['environment'],
    globalWarming: response['global-warming'],
  };
}
