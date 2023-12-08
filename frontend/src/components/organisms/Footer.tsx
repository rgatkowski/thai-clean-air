import { Box, styled } from '@mui/system';
import CitiesImages from '@tc/molecules/CitiesImages';
import SignThePetition from '@tc/molecules/SignThePetition';

const StyledFooter = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(16)} 0`,
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
}));

interface IFooterProps {
  clearOverlay: () => void;
}

const Footer = ({ clearOverlay }: IFooterProps) => {
  return (
    <StyledFooter id="footer">
      <CitiesImages />
      <SignThePetition clearOverlay={clearOverlay} />
    </StyledFooter>
  );
};

export default Footer;
