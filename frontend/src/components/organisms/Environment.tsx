import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import styled from '@mui/material/styles/styled';
import { ENVIRONMENT } from '@tc/images';

const StyledEnvironment = styled(Box)(({ theme }) => ({
    position: 'relative',
    padding: `${theme.spacing(14)} 0`,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backgroundBlendMode: 'color',
    backgroundImage: `url(${ENVIRONMENT.src})`,
}));

const StyledInfo = styled(Box)(({ theme }) => ({
    padding: `${theme.spacing(6)} ${theme.spacing(4)}`,
    borderRadius: 20,
    backdropFilter: 'blur(4px)',
    boxShadow: 'box-shadow: -10px 15px 15px 10px rgba(0,0,0,0.3)',
    background: 'rgba(255, 255, 255, 0.1)',
}));

const StyledText = styled(Box)(({ theme }) => ({
    width: '80%',
    minWidth: '20rem',
    margin: '0 auto',
}));

interface EnvironmentProps {
    text?: string;
}

const Environment = ({
    text = 'Air pollution destroys our environment and natural resources. It causes deforestation, acid rain, climate change and biodiversity loss. You can help us to protect our environment by joining the #StopTheSmoke campaign.',
}: EnvironmentProps) => (
    <StyledEnvironment>
        <Container maxWidth='md'>
            <StyledInfo>
                <Typography variant='h2' mb={4}>
                    We want to preserve the environment
                </Typography>
                <StyledText>
                    {text}
                </StyledText>
            </StyledInfo>
        </Container>
    </StyledEnvironment>
);

export default Environment;