import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Modal,
  FlatList,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import { DropdownIcon, DropupIcon } from "../icons/icons";
import { useTheme } from "styled-components/native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";
import { Text } from "../text/text";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { DropdownOption } from "./dropdown-option";

type Option<T> = { label: string; value: T };

type SelectProps<T> = {
  options: Option<T>[];
  onSelect: (item: Option<T>) => void;
  value: T;
  wrapperStyle?: StyleProp<ViewStyle>;
};

const Overlay = styled(View)`
  flex: 1;
`;

const DropdownField = styled(Animated.View)`
  min-width: 170px;
  justify-content: space-between;
  flex-direction: row;
  gap: 12px;
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 15px 15px 15px 19px;
  border: 1px solid ${(props) => props.theme.colors.dark[700]};
`;

const DropdownLabel = styled(Text)`
  font-size: 16px;
`;

const DropdownList = styled(View)`
  padding: 6px 0;
  position: absolute;
  background-color: ${(props) => props.theme.colors.dark[500]};
  border-radius: ${(props) => props.theme.borderRadius};
`;

export const Dropdown = <T,>({
  options,
  onSelect,
  value,
  wrapperStyle,
}: SelectProps<T>) => {
  const [expanded, setExpanded] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 100,
  });
  const selectRef = useRef<View>(null);

  const overlayTap = Gesture.Tap()
    .onEnd(() => {
      setExpanded(false);
    })
    .runOnJS(true);

  const {
    colors: { dark, grey },
  } = useTheme();

  const backgroundColor = useSharedValue(dark[700]);
  const borderColor = useSharedValue(dark[700]);
  const [textColor, setTextColor] = useState(grey[400]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
    borderColor: borderColor.value,
  }));

  const { width } = useWindowDimensions();

  const toggleDropdown = () => {
    if (!expanded) {
      updatePosition();
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

  const updatePosition = () => {
    selectRef.current?.measure((fx, fy, width, height, px, py) => {
      setDropdownPosition({
        top: py + height + 5,
        left: px,
        width: Math.max(width, 120),
      });
    });
  };

  useEffect(() => {
    updatePosition();
  }, [width]);

  function handlePressIn() {
    backgroundColor.value = dark[700];
    borderColor.value = dark[250];
    setTextColor("#FFF");
  }

  function handleHoverIn() {
    backgroundColor.value = dark[500];
    borderColor.value = dark[500];
    setTextColor("#FFF");
  }

  function handleToDefault() {
    backgroundColor.value = dark[700];
    borderColor.value = dark[700];
    setTextColor(grey[400]);
  }

  const handleSelect = (item: Option<T>) => {
    onSelect(item);
  };

  return (
    <View style={wrapperStyle}>
      <Pressable
        onPress={toggleDropdown}
        onPressIn={handlePressIn}
        onPressOut={handleToDefault}
        onHoverIn={handleHoverIn}
        onHoverOut={handleToDefault}
      >
        <DropdownField style={animatedStyle} ref={selectRef}>
          <DropdownLabel $weight={500} style={{ color: textColor }}>
            {options.find((o) => o.value == value)?.label || "Выберите"}
          </DropdownLabel>
          {expanded ? (
            <DropupIcon color={textColor} />
          ) : (
            <DropdownIcon color={textColor} />
          )}
        </DropdownField>
      </Pressable>

      {expanded && (
        <Modal
          transparent
          visible={expanded}
          onRequestClose={() => setExpanded(false)}
        >
          <GestureHandlerRootView>
            <GestureDetector gesture={overlayTap}>
              <Overlay>
                <DropdownList
                  style={[
                    {
                      top: dropdownPosition.top,
                      left: dropdownPosition.left,
                      width: dropdownPosition.width,
                    },
                  ]}
                >
                  <FlatList
                    data={options}
                    keyExtractor={(item) =>
                      (item.value as unknown as string) || "0"
                    }
                    renderItem={({ item }) => (
                      <DropdownOption
                        selected={value === item.value}
                        onSelect={handleSelect.bind(null, item)}
                      >
                        {item.label}
                      </DropdownOption>
                    )}
                  />
                </DropdownList>
              </Overlay>
            </GestureDetector>
          </GestureHandlerRootView>
        </Modal>
      )}
    </View>
  );
};
