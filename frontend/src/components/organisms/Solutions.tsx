import { useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styled from '@mui/material/styles/styled';
import { CAR } from '@tc/images';

const StyledSolutions = styled(Box)(({ theme }) => ({
    padding: `${theme.spacing(14)} 0`,
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh',
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
    },
}));

const StyledImage = styled('img')(({theme}) => ({
    position: 'relative',
    top: 0, 
    left: 0,
    width: '100%',
    padding: theme.spacing(2),
    objectFit: 'contain',
    objectPosition: 'top center',
    border: '5px solid transparent',
    borderColor: theme.palette.info.main,
    borderRadius: '100%',
    transition: 'transform 0.2s ease',
    margin: '0 auto',
}));

interface SolutionsProps {
    text?: string;
}

const Solutions = ({
    text = 'Air pollution can be prevented and reduced by adopting clean and renewable energy sources, improving public transportation, promoting green spaces and recycling, and enforcing environmental regulations.',
}: SolutionsProps) => {
    const imageRef = useRef(null);

    const moveImage = (event: any) => {
        if (!imageRef.current) return;
        const image = imageRef.current as HTMLImageElement;
        image.style.left = event.clientX * -1/100 + 'px';
        image.style.top = event.clientY * -1/100 + 'px';
    }

    return (<StyledSolutions onMouseMove={moveImage}>
        <Container maxWidth='md'>
           
            <Grid container spacing={4} justifyContent='space-between' alignItems='center'>
                <Grid item md={5} xs={12}>
                    <StyledImage src={CAR.src} alt={CAR.alt} ref={imageRef} />
                </Grid>
                <Grid item md={6} xs={12}> 
                    <Typography variant='h1' component='h2' color='info.main' mb={4}>
                        We want solutions
                    </Typography>
                    <Typography>
                        {text}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    </StyledSolutions>);
};

export default Solutions;