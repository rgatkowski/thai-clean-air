import { Button, Typography, styled } from '@mui/material';
import { Box, Container } from '@mui/system';

const StyledSignThePetition = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center',
  backdropFilter: 'blur(4px)',
  borderRadius: '30px',
  padding: '15px',
  zIndex: '999',
}));

const StyledButton = styled(Button)(() => ({
  marginTop: '30px',
  minWidth: '40%',
}));

const StyledBackground = styled(Box)(() => ({}));

interface ISignThePetitionProps {
  clearOverlay: () => void;
}

const SignThePetition = ({ clearOverlay }: ISignThePetitionProps) => {
  const goToThePetition = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    clearOverlay();
    e.preventDefault();
    setTimeout(() => (window.location.href = 'https://thailandcan.org/'), 2000);
  };

  return (
    <StyledSignThePetition>
      <Container maxWidth="lg">
        <StyledBackground>
          <Typography variant="h1" color="info" mb={4}>
            Sign the petition
          </Typography>
        </StyledBackground>
        <StyledButton
          onClick={(e) => goToThePetition(e)}
          href="https://thailandcan.org/"
          variant="contained"
          color="secondary"
          size="large"
        >
          HERE
        </StyledButton>
      </Container>
    </StyledSignThePetition>
  );
};

export default SignThePetition;
