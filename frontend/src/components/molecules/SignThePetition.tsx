import { Button, Typography, styled } from '@mui/material';
import { Box, Container } from '@mui/system';

const StyledInfo = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(6)} ${theme.spacing(4)}`,
  textAlign: 'center',
  margin: '0 auto',
  borderRadius: 20,
  backdropFilter: 'blur(4px)',
  boxShadow: 'box-shadow: -10px 15px 15px 10px rgba(0,0,0,0.3)',
  background: 'rgba(255, 255, 255, 0.1)',
  zIndex: '999',
}));

interface ISignThePetitionProps {
  clearOverlay: () => void;
}

const SignThePetition = ({ clearOverlay }: ISignThePetitionProps) => {
  const goToThePetition = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    clearOverlay();
    e.preventDefault();
    setTimeout(() => window.open('https://thailandcan.org/', '_blank'), 2000);
  };

  return (
  <Container maxWidth="md">
    <StyledInfo>
      <Typography variant="h1" color="info.main" mb={4}>
        Sign the petition
      </Typography>
      <Button
        onClick={(e) => goToThePetition(e)}
        variant="contained"
        color="secondary"
        size="large"
      >
        Stop the smoke
      </Button>
    </StyledInfo>
  </Container>
  );
};

export default SignThePetition;
