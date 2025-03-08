import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import React, { ReactNode, useEffect, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { Pressable } from "react-native-gesture-handler";
import { PressableEvent } from "react-native-gesture-handler/lib/typescript/components/Pressable/PressableProps";
import { useTheme } from "styled-components/native";
import { Text } from "../text/text";

type ButtonProps = {
  startSlot?: ReactNode;
  endSlot?: ReactNode;
  disabled?: boolean;
  onPress?: (event: PressableEvent) => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
};

const ButtonContainer = styled(Animated.View)`
  cursor: pointer;
  min-height: 56px;
  padding: 15px 40px;

  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;

  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.primary[500]};
`;

const SlotStyled = styled(View)`
  color: inherit;
`;

const ButtonText = styled(Text)`
  font-size: 18px;
  line-height: 22px;
`;

const Button = ({
  onPress,
  children,
  startSlot,
  endSlot,
  disabled,
  style,
  wrapperStyle,
}: ButtonProps) => {
  const {
    colors: { primary },
  } = useTheme();

  const backgroundColor = useSharedValue(
    disabled ? primary[700] : primary[500]
  );

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  useEffect(() => {
    backgroundColor.value = withTiming(disabled ? primary[700] : primary[500], {
      duration: 200,
    });
  }, [disabled]);

  function handlePressIn() {
    if (!disabled) {
      backgroundColor.value = withTiming(primary[600], { duration: 200 });
    }
  }

  function handleHoverIn() {
    if (!disabled) {
      backgroundColor.value = withTiming(primary[550], { duration: 200 });
    }
  }

  function handleToDefault() {
    backgroundColor.value = withTiming(disabled ? primary[700] : primary[500], {
      duration: 200,
    });
  }

  const slotsStyle = {
    opacity: disabled ? 0.4 : 1,
  };

  return (
    <Pressable
      style={wrapperStyle}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handleToDefault}
      onHoverIn={handleHoverIn}
      onHoverOut={handleToDefault}
    >
      <ButtonContainer style={[animatedStyle, style]}>
        {startSlot && <SlotStyled style={slotsStyle}>{startSlot}</SlotStyled>}
        <ButtonText
          $weight={600}
          style={{ color: disabled ? "#787878" : "#FFF" }}
        >
          {children}
        </ButtonText>
        {endSlot && <SlotStyled style={slotsStyle}>{endSlot}</SlotStyled>}
      </ButtonContainer>
    </Pressable>
  );
};

export { Button };
