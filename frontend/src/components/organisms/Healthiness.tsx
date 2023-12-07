import { useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styled from '@mui/material/styles/styled';
import { MASK } from '@tc/images';

const StyledHealthiness = styled(Box)(({ theme }) => ({
    padding: `${theme.spacing(14)} 0`,
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh'
}));

const StyledImage = styled('img')(({theme}) => ({
    display: 'block',
    position: 'relative',
    top: 0, 
    left: 0,
    width: '100%',
    padding: theme.spacing(2),
    objectFit: 'contain',
    objectPosition: 'top center',
    border: '5px solid transparent',
    borderColor: theme.palette.secondary.main,
    borderRadius: '100%',
    transition: 'transform 0.2s ease',
}));

interface HealthinessProps {
    text?: string;
}

const Healthiness = ({
    text = 'Air pollution harms our health and our future. It can damage the development of our children and the unborn children. It can also hurt our economy, our tourism, our agriculture and our natural resources. We need to act now to #StopTheSmoke',
}: HealthinessProps) => {
    const imageRef = useRef(null);

    const moveImage = (event: any) => {
        if (!imageRef.current) return;
        const image = imageRef.current as HTMLImageElement;
        image.style.left = event.clientX * -1/100 + 'px';
        image.style.top = event.clientY * -1/100 + 'px';
    }

    return (<StyledHealthiness onMouseMove={moveImage}>
        <Container maxWidth='md'>
            <Grid container spacing={4} justifyContent='space-between' alignItems='center'>
                <Grid item md={5} order={{ md:2 }}>
                    <StyledImage src={MASK.src} alt={MASK.src} ref={imageRef} />
                </Grid>
                <Grid item md={6} order={{ md: 1 }}>
                    <Typography variant='h2' color='secondary' mb={4}>
                        We want healthiness
                    </Typography>
                    <Typography>
                        {text}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    </StyledHealthiness>);
};

export default Healthiness;