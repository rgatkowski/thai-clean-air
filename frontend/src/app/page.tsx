'use client';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import Overlay from '@tc/atoms/Overlay';
import ArticlesPage from '@tc/organisms/ArticlePage';

import useGetLocation from '@tc/utils/useGetLocation';

import { defaultPM25Value } from '@tc/constants/defaultValues';
import { getArticles, getPm25ForUsersLocation } from '@tc/server/APIrequests';
import { IArticles } from '@tc/types/commonTypes';

export default function Home() {
  const [latitude, longitude] = useGetLocation();
  const [pm25value, setPm25value] = useState<number>(defaultPM25Value);
  const [articles, setArticles] = useState<IArticles>({});

  useEffect(() => {
    if (latitude && longitude) {
      getPm25ForUsersLocation(latitude, longitude).then((res) => {
        setPm25value(res);
      });
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (pm25value && pm25value > 0) {
      getArticles(pm25value).then((res) => {
        setArticles(res);
      });
    }
  }, [pm25value]);

  return (
    <>
      <Typography variant="h1">Lets make some test</Typography>
      <Overlay particlesNumber={pm25value} />
      <ArticlesPage articles={articles} />
    </>
  );
}
