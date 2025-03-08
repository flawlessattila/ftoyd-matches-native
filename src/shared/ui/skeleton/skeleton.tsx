import React, { ReactNode, useEffect, useRef } from "react";
import { Animated, Easing, StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";

const Container = styled(Animated.View)`
  height: 100%;
  width: 100%;
  background-color: #171d25;
`;

const Skeleton = ({
  children,
  style,
}: {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const fadeAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    fadeAnimation.start();

    return () => fadeAnimation.stop();
  }, []);

  return <Container style={[style, { opacity }]}>{children}</Container>;
};

export { Skeleton };
