'use client';
import { useEffect, useState } from 'react';

import Overlay from '@tc/atoms/Overlay';
import Hero from '@tc/organisms/Hero';
import Healthiness from '@tc/organisms/Healthiness';
import Environment from '@tc/organisms/Environment';
import Solutions from '@tc/organisms/Solutions';
import Footer from '@tc/organisms/Footer';
import Justice from '@tc/organisms/Justice';

import useGetLocation from '@tc/utils/useGetLocation';

import { defaultPM25Value } from '@tc/constants/defaultValues';
import { readMeasures, readArticles } from '@tc/server/APIrequests';
import { ArticlesAttributes } from '@tc/types/commonTypes';

export default function Home() {
  const [latitude, longitude] = useGetLocation();

  const [pm25, setPm25] = useState(defaultPM25Value);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [articles, setArticles] = useState<ArticlesAttributes>();

  const clearOverlay = () => {
    setPm25('0');
  };

  useEffect(() => {
    if (latitude && longitude) {
      readMeasures(latitude, longitude).then((res) => {
        setPm25(res.pm25);
        setCountry(res.country);
        setCity(res.city);
      });
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (latitude && longitude) {
      readArticles(latitude, longitude).then((res) => {
        setArticles(res)
      });
    }
  }, [latitude, longitude]);

  return (
    <>
      <Hero city={city} />
      <Healthiness text={articles?.healthiness} />
      <Environment text={articles?.environment} />
      <Solutions text={articles?.solutions} />
      <Justice text={articles?.justice} />
      <Footer clearOverlay={clearOverlay} />
      <Overlay particlesNumber={parseInt(pm25)} />
    </>
  );
}
