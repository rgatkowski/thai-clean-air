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

  const [pm25, setPm25] = useState(defaultPM25Value);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [articles, setArticles] = useState<IArticles>();

  useEffect(() => {
    if (latitude && longitude) {
      getPm25ForUsersLocation(latitude, longitude).then((res) => {
        setPm25(res.pm25);
        setCountry(res.country);
        setCity(res.city);
      });
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (pm25 && city && country && pm25) {
      getArticles({ pm25, city, country }).then((res) => {
        setArticles(res);
      });
    }
  }, [city, country, pm25]);

  return (
    <>
      <Typography variant="h1">Lets make some test</Typography>
      <Overlay particlesNumber={parseInt(pm25)} />
      <ArticlesPage articles={articles} />
    </>
  );
}
