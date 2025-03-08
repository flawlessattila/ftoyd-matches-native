import type { DefaultTheme } from "styled-components/native";

export type ThemeColor = "success" | "primary" | "warning";

const theme: DefaultTheme = {
  borderRadius: "4px",
  colors: {
    primary: {
      500: "#EB0237",
      550: "#ca0231",
      600: "#A01131",
      700: "#701328",
    },
    success: {
      500: "#43AD28",
    },
    warning: {
      500: "#EB6402",
    },
    dark: {
      250: "#171D25",
      300: "#11161D",
      400: "#101318",
      500: "#0F1318",
      600: "#0D1115",
      700: "#0B0E12",
      800: "#06080C",
    },
    grey: {
      50: "#FAFAFA",
      400: "#B4B5B6",
    },
    light: {
      500: "#F2F6F6",
    },
  },
  typography: {
    primary: {
      regular: "InterRegular",
      medium: "InterMedium",
      semiBold: "InterSemiBold",
      interBold: "InterBold",
    },
    secondary: {
      blackItalic: "TacticBlackItalic",
    },
  },
};

export const resolveThemeColor = (color?: ThemeColor) => {
  let hexColor: string = theme.colors.primary[500];
  switch (color) {
    case "success":
      hexColor = theme.colors.success[500];
      break;
    case "warning":
      hexColor = theme.colors.warning[500];
      break;
  }
  return hexColor;
};

export { theme };
