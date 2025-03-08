import React, { ReactNode, useState } from "react";
import { Pressable } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Text } from "../text/text";
import { useTheme } from "styled-components/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const Container = styled(Animated.View)`
  padding: 12px;
  background-color: ${(props) => props.theme.colors.dark[500]};
`;

const Label = styled(Text)`
  font-size: 16px;
  color: ${(props) => props.theme.colors.grey[400]};
`;

const DropdownOption = ({
  children,
  selected,
  onSelect,
}: {
  children?: ReactNode;
  selected?: boolean;
  onSelect?: () => void;
}) => {
  const {
    colors: { dark, grey },
  } = useTheme();

  const [textColor, setTextColor] = useState(selected ? "#FFF" : grey[400]);

  const backgroundColor = useSharedValue(dark[500]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  function handlePressIn() {
    backgroundColor.value = dark[600];
    setTextColor("#FFF");
  }

  function handleHoverIn() {
    backgroundColor.value = dark[300];
    setTextColor("#FFF");
  }

  function handleToDefault() {
    backgroundColor.value = dark[500];
    setTextColor(selected ? "#FFF" : grey[400]);
  }

  return (
    <Pressable
      onPress={onSelect}
      onPressIn={handlePressIn}
      onHoverIn={handleHoverIn}
      onPressOut={handleToDefault}
      onHoverOut={handleToDefault}
    >
      <Container style={animatedStyle}>
        <Label style={{ color: textColor }} $weight={500}>
          {children}
        </Label>
      </Container>
    </Pressable>
  );
};

export { DropdownOption };
