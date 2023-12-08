import { MeasuresAttributes, ArticlesAttributes } from '@tc/types/commonTypes';
import server from './server';

export const readMeasures = async (latitude: number, longitude: number) => {
  const measures = await server.get<MeasuresAttributes>('/measures', {
    params: {
      location: `${latitude},${longitude}`,
      limit: 10,
    }
  });

  return measures.data;
};

export const readArticles = async (latitude: number, longitude: number) => {
  const articles = await server.get<ArticlesAttributes>(`/articles`, {
    params: {
      location: `${latitude},${longitude}`,
    }
  });

  console.log(articles);

  return articles.data;
}
