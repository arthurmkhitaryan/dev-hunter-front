import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    border: {
      radius: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        rounded: string;
      };
    };
    palette: {
      common: {
        black: string;
        white: string;
      };
      primary: {
        background: string;
        hover: string;
        textColor: string;
        border: string;
        green: string;
        yellow: string;
        textWarning: string;
        backgroundGreen: string;
        backgroundLightGreen: string;
        paper: string;
      };
      secondary: {
        background: string;
        hover: string;
        textColor: string;
        border: string;
        paper: string;
        green?: string;
        backgroundGreen?: string;
      };
    };
  }
}
