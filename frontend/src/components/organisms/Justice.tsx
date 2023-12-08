import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styled from '@mui/material/styles/styled';

const StyledJustice = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(7)} 0 ${theme.spacing(14)}`,
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
      <Container maxWidth="md">
        <Grid container spacing={4} alignItems='center'>
          <Grid item xs={6} textAlign='center' color='primary.main'>
              <Typography variant="h1" component='p' mb={4}>
                We want
              </Typography>
              <Typography variant="h1" component='h2'>
                JUSTICE
              </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{text}</Typography>
          </Grid>
        </Grid>
      </Container>
    </StyledJustice>
  );
};

export default Justice;
