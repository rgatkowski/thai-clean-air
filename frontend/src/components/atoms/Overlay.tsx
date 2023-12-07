import { useRef, useEffect } from 'react';
import styled from '@mui/material/styles/styled';

import SmokeCanvas from '@tc/utils/SmokeCanvas';
import clamp from '@tc/utils/clamp';

interface OverlayProps {
  particlesNumber: number;
}

const StyledCanvas = styled('canvas')((props) => ({
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  userSelect: 'none',
  pointerEvents: 'none',
  zIndex: 10,
}));

const Overlay = ({ particlesNumber }: OverlayProps) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return console.log('Non supported canvas');
    const canvas = new SmokeCanvas(canvasRef.current, particlesNumber);

    let lastTime = 0;

    function animate(timeStamp: number) {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;

      canvas.update(deltaTime);
      canvas.draw();

      requestAnimationFrame(animate);
    }
    animate(0);
  }, [particlesNumber]);

  return <StyledCanvas ref={canvasRef} sx={{  background: `rgba(0, 0, 0, ${clamp(0, particlesNumber, 60) / 100 - 0.1})` }} />;
};

export default Overlay;
