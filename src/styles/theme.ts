import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  border: {
    radius: {
      sm: '6px',
      md: '12px',
      lg: '20px',
      xl: '22px',
      rounded: '50%',
    },
  },
  palette: {
    common: {
      white: '#FFFFFF',
      black: '#000000',
    },
    primary: {
      background: '#614EFA',
      hover: '#422ffa',
      textColor: '#3C4248',
      border: '#C3C8CD',
      green: '#008B6E',
      yellow: '#FFE69D',
      textWarning: '#493B13',
      backgroundGreen: '#E8FAF6',
      backgroundLightGreen: '#CEF4EC',
      paper: '#F2F3F4',
    },
    secondary: {
      background: '#C3C8CD',
      hover: '#9ea0a6',
      textColor: '#6D7883',
      border: '#252525',
      paper: '#F2F3F4',
    },
  },
};
