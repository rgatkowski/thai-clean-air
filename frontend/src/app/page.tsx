'use client';
import { useEffect, useState } from 'react';

import Overlay from '@tc/atoms/Overlay';
import Hero from '@tc/organisms/Hero';
import Healthiness from '@tc/organisms/Healthiness';
import Environment from '@tc/organisms/Environment';
import Solutions from '@tc/organisms/Solutions';
import Footer from '@tc/organisms/Footer';

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

  const clearOverlay = () => {
    setPm25('0');
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, country]);

  return (
    <>
      <Hero city={city} />
      <Healthiness text={articles?.shortTermHealth} />
      <Environment text={articles?.environment} />
      <Solutions text={articles?.globalWarming} />
      <Footer clearOverlay={clearOverlay} />
      <Overlay particlesNumber={parseInt(pm25)} />
    </>
  );
}
