import { useRef, useEffect } from 'react';
import styled from '@mui/material/styles/styled';

import SmokeCanvas from '@tc/utils/SmokeCanvas';

interface OverlayProps {
    particlesNumber?: number;
}

const StyledCanvas = styled('canvas')(() => ({
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    userSelect: 'none',
    pointerEvents: 'none',
}));

const Overlay = ({
    particlesNumber = 5
}: OverlayProps) => {
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
    }, [particlesNumber])

    return (
        <StyledCanvas ref={canvasRef} />
    )
}

export default Overlay;