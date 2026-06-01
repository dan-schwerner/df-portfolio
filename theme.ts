'use client';
import { Roboto } from 'next/font/google';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Raleway } from "next/font/google";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const raleway = Raleway({
  weight: ["200", "400"],
  style: ["normal"],
  subsets: ["latin"],
});

const theme = createTheme({
  typography: {
    fontFamily: raleway.style.fontFamily,
    h1: {
      margin: '45px 0px',
      fontWeight: 'normal'
    },
    h2: {
      fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      margin: '0 0 2rem',
      textAlign: 'left',
      fontFamily: roboto.style.fontFamily
    },
    h3: {
      margin: '1rem 0rem'

    },
    body1: {
      marginBottom: '1rem',
      fontSize: '1rem',
      lineHeight: 1.75
    },
    body2: {
      marginBottom: '1rem',
      fontSize: '0.9rem',
      lineHeight: 1.65
    }
  },
  palette: {
    primary: {
      main: '#4961b0'
    },
    secondary: {
      main: '#ffff'
    }
  },
  components: {
    MuiTab: {
      styleOverrides: {
        textColorPrimary: {
          '&.Mui-selected': {
            color: '#32406e'
          }
        }
      }, 
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          marginBottom: 0
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontStyle: 'italic',
          fontSize: '1rem',
        },
        subheader: {
          fontStyle: 'italic',
          fontSize: '1rem',
        },
      },
    },
  }
});

// Skip h2/body1/body2 so their explicit reference-matched sizes (h2 uses a
// self-responsive clamp; body sizes are fixed) aren't overridden by the
// auto-generated responsive breakpoints. Other headings still scale responsively.
export default responsiveFontSizes(theme, {
  variants: ['h1', 'h3', 'h4', 'h5', 'h6'],
});