import { ReactNode, useEffect } from "react";
import {
  runOnUI,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import styled, { css } from "styled-components/native";
import { theme } from "@/shared/theme/theme";
import { StyleProp, View, ViewStyle } from "react-native";

const backdroundColors = {
  1: theme.colors.dark[700],
  2: theme.colors.dark[500],
  3: theme.colors.dark[400],
};

type FloatingCardProps = {
  $level?: 1 | 2 | 3;
  $appearWithAnimation?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Card = styled.View<FloatingCardProps>`
  border-radius: 4px;
  background-color: ${({ $level }) => backdroundColors?.[$level || 1]};
`;

const FloatingCard = ({
  $level,
  children,
  $appearWithAnimation,
  style,
}: FloatingCardProps) => {
  const scale = useSharedValue($appearWithAnimation ? 0.8 : 1);

  useEffect(() => {
    scale.value = withSpring(1);
  }, [$appearWithAnimation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Card $level={$level} style={[animatedStyle, style]}>
      {children}
    </Card>
  );
};

export { FloatingCard };
