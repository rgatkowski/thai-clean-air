import createTheme from '@mui/material/styles/createTheme';
import { Sarabun, Dela_Gothic_One } from 'next/font/google';
 
const sarabun = Sarabun({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
});

const delaGothicOne = Dela_Gothic_One({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
});

const DefaultTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#202d64',
    },
    secondary: {
      main: '#40bab5',
    },
    info: {
      main: "#fc4f60",
    },
    background: {
      default: '#f9fafd',
    },
    text: {
      primary: '#272728',
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: delaGothicOne.style.fontFamily,
    h1: {
      fontWeight: 400,
      lineHeight: 1.4,
      fontSize: 'clamp( 4rem, 12vmin, 6rem )',
    },
    h2: {
      fontSize: 'clamp( 1.5rem, 5vmin, 2.5rem )',
      fontWeight: 400,
      lineHeight: 1.4,
    },
    h3: {
      fontSize: 'clamp( 1rem, 3.6vmin, 1.75rem )',
      lineHeight: 1.4,
      fontWeight: 400,
    },
    body1: {
      fontFamily: sarabun.style.fontFamily,
      fontSize: 'clamp( 0.75rem, 2.4vmin, 1.5rem )',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontFamily: sarabun.style.fontFamily,
      fontSize: 'clamp( 0.5rem, 2vmin, 1.25rem )',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    caption: {
      fontSize: 'clamp( 0.5rem, 2vmin, 1.25rem )',
      lineHeight: 1.6,
      fontWeight: 400,
    },
  },
});

export default DefaultTheme;