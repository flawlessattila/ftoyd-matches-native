import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { useTheme } from "styled-components/native";

const Background = styled.View`
  flex: 1;
`;

const BasicLayout = ({ children }: { children: ReactNode }) => {
  const {
    colors: { dark },
  } = useTheme();

  return (
    <Background style={{ backgroundColor: dark[800] }}>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </Background>
  );
};

export default BasicLayout;
