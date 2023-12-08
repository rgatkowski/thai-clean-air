import { CLEANCITY, POLLUTEDCITY } from '@/src/constants/images';
import { Grid, styled } from '@mui/material';

const StyledImage = styled('img')(({ theme }) => ({
  display: 'block',
  position: 'relative',
  top: 0,
  left: 0,
  width: '100%',
  objectFit: 'contain',
  objectPosition: 'top center',
}));

const CitiesImages = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={6} zeroMinWidth>
        <StyledImage src={POLLUTEDCITY.src} alt={POLLUTEDCITY.alt} />
      </Grid>
      <Grid item xs={6} zeroMinWidth>
        <StyledImage src={CLEANCITY.src} alt={CLEANCITY.alt} />
      </Grid>
    </Grid>
  );
};

export default CitiesImages;
