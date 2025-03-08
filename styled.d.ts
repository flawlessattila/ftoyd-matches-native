import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      primary: {
        500: string;
        550: string;
        600: string;
        700: string;
      };
      success: {
        500: string;
      };
      warning: {
        500: string;
      };
      dark: {
        250: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
      };
      grey: {
        50: string;
        400: string;
      };
      light: {
        500: string;
      };
    };
    typography: {
      primary: {
        regular: string;
        medium: string;
        semiBold: string;
        interBold: string;
      };
      secondary: {
        blackItalic: string;
      };
    };
  }
}
