import { Box, styled } from '@mui/system';
import CitiesImages from '../molecules/CitiesImages';
import SignThePetition from '../molecules/SignThePetition';

const StyledFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

interface IFooterProps {
  clearOverlay: () => void;
}

const Footer = ({ clearOverlay }: IFooterProps) => {
  return (
    <StyledFooter>
      <CitiesImages />
      <SignThePetition clearOverlay={clearOverlay} />
    </StyledFooter>
  );
};

export default Footer;
