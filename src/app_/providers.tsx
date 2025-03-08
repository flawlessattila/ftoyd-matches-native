import React, { ReactNode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { theme } from "@/shared/theme/theme";
import { ThemeProvider } from "styled-components/native";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: { children: ReactNode }) => {
  const [] = useFonts({
    InterRegular: require("../../assets/fonts/Inter-Regular.otf"),
    InterMedium: require("../../assets/fonts/Inter-Medium.otf"),
    InterSemiBold: require("../../assets/fonts/Inter-SemiBold.otf"),
    InterBold: require("../../assets/fonts/Inter-Bold.otf"),
    TacticBlackItalic: require("../../assets/fonts/TacticSans-BlkIt.ttf"),
  });

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export { Providers };
