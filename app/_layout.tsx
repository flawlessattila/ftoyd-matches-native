import "react-native-reanimated";
import { Providers } from "@/app_/providers";
import { Stack } from "expo-router";
import { Platform } from "react-native";

/*
  react-native-reanimated web issue
  solved by:
  https://github.com/software-mansion/react-native-reanimated/issues/6740#issuecomment-2494730465
*/
if (Platform.OS === "web") {
  global._WORKLET = false;
  // @ts-expect-error
  global._log = console.log;
  // @ts-expect-error
  global._getAnimationTimestamp = () => performance.now();
}

export default function RootLayout() {
  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }} />
    </Providers>
  );
}

