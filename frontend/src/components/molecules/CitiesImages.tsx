import { CLEANCITY, POLLUTEDCITY } from '@/src/constants/images';
import { Grid, styled } from '@mui/material';

const StyledImage = styled('img')(({ theme }) => ({
  display: 'block',
  top: 0,
  left: 0,
  width: '100%',
  objectFit: 'contain',
  objectPosition: 'top center',
  zIndex: -1,
}));

const StyledContainer = styled(Grid)(() => ({
  position: 'absolute',
  width: '100%',
  overflow: 'hidden',
  height: '100%',
  "&:before": {
    content: "''" as string,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.3)',
    zIndex: 0,
  }
}))

const CitiesImages = () => {
  return (
    <StyledContainer container spacing={0}>
      <Grid item xs={6} zeroMinWidth>
        <StyledImage src={POLLUTEDCITY.src} alt={POLLUTEDCITY.alt} />
      </Grid>
      <Grid item xs={6} zeroMinWidth>
        <StyledImage src={CLEANCITY.src} alt={CLEANCITY.alt} />
      </Grid>
    </StyledContainer>
  );
};

export default CitiesImages;
