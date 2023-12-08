import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styled from '@mui/material/styles/styled';

const StyledJustice = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(14)} 0`,
  display: 'flex',
  alignItems: 'center',
  minHeight: '100vh',
}));

interface JusticeProps {
  text?: string;
}

const Justice = ({
  text = 'Air pollution violates our human rights and our dignity. It affects the most vulnerable and marginalized groups in our society, such as the poor, the elderly, the children and the indigenous people. It also increases the risk of social conflicts and violence. We demand justice and accountability from the polluters and the authorities. Join us to #StopTheSmoke',
}: JusticeProps) => {
  return (
    <StyledJustice>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item container spacing={6} xs={6} direction="column">
            <Grid item alignSelf={'center'}>
              <Typography variant="h1" color="secondary">
                we want
              </Typography>
            </Grid>
            <Grid item alignSelf={'center'}>
              <Typography variant="h1" color="secondary">
                JUSTICE
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} alignSelf={'center'}>
            <Typography>{text}</Typography>
          </Grid>
        </Grid>
      </Container>
    </StyledJustice>
  );
};

export default Justice;
