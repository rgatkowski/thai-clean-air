import { MeasuresAttributes, ArticlesAttributes } from '@tc/types/commonTypes';
import server from './server';

export const readMeasures = async (latitude: number, longitude: number) => {
  const measures = await server.get<MeasuresAttributes, { data: { city: string, country: string, results: { value: string } }}>('/measures', {
    params: {
      location: `${latitude},${longitude}`,
      limit: 10,
    }
  });

  const {
    city,
    country,
    results: { value: pm25 },
  } = measures.data;

  return {
    city,
    country,
    pm25,
  };
}
export const readArticles = async (latitude: number, longitude: number) => {
  const articles = await server.get<ArticlesAttributes>(`/articles`, {
    params: {
      location: `${latitude},${longitude}`,
    }
  });

  return articles.data;
}
