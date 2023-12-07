"use client";
import { Typography } from '@mui/material';

import Overlay from '@tc/atoms/Overlay';
import Hero from '@tc/organisms/Hero';
import Healthiness from '@tc/organisms/Healthiness';

export default function Home() {
  return (
    <>
    <Hero />
    <Healthiness />
    <Overlay particlesNumber={10} />
    </>   
  )
}
