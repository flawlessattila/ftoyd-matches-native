import React, { ReactNode } from "react";
import styled from "styled-components/native";
import { resolveThemeColor, ThemeColor } from "@/shared/theme/theme";
import { WarningIcon } from "../icons/icons";
import { FloatingCard } from "../floating-card/floating-card";
import { StyleProp, View, ViewStyle } from "react-native";
import { Text } from "../text/text";

type AlertProps = {
  color?: ThemeColor;
  icon?: ReactNode;
  title?: string;
  $appearWithAnimation?: boolean;
  style?: StyleProp<ViewStyle>;
};

const AlertContainer = styled(FloatingCard)`
  padding: 14px 24px;
  display: flex;
  gap: 10px;
  flex-direction: row;
  align-items: center;
  max-width: 100%;
`;

const AlertTitle = styled(Text)`
  font-size: 18px;
  line-height: 22px;
  color: #fff;
`;

const Alert = ({
  color,
  icon,
  title,
  $appearWithAnimation,
  style,
}: AlertProps) => {
  return (
    <AlertContainer
      $level={2}
      $appearWithAnimation={$appearWithAnimation}
      style={style}
    >
      {icon || (
        <WarningIcon color={resolveThemeColor(color)} height={28} width={28} />
      )}
      {title && <AlertTitle $weight={500}>{title}</AlertTitle>}
    </AlertContainer>
  );
};

export { Alert };
