import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import styled from '@mui/material/styles/styled';

const StyledHero = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(14)} 0`,
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  minHeight: '100vh',
  overflow: 'hidden',
}));

const StyledButton = styled(Button)(() => ({
  position: 'relative',
  zIndex: '999',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
}));

interface HeroProps {
  city?: string;
}

const Hero = ({ city = 'the' }: HeroProps) => {
  const cleanTheSmoke = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <StyledHero>
      <Container maxWidth="lg">
        <StyledTitle variant="h1" color="primary" mb={4}>
          #StopTheSmoke
        </StyledTitle>
        <Typography variant="h3" component="p" mb={6}>
          We can make {city} change
        </Typography>
        <StyledButton onClick={cleanTheSmoke} href="#" variant="contained" color="secondary" size="large">
          Clean the smoke
        </StyledButton>
      </Container>
    </StyledHero>
  );
};

export default Hero;
