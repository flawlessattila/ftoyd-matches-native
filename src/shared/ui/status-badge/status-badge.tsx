import { resolveThemeColor, ThemeColor } from "@/shared/theme/theme";
import React, { ReactNode } from "react";
import styled, { css } from "styled-components/native";
import { Text } from "../text/text";
import { useMedia } from "@/shared/lib/use-media";

type StatusBadgeProps = {
  color?: ThemeColor;
  children?: ReactNode;
};

const ContainerStyled = styled.View<{ color?: string }>`
  border-radius: 4px;
  min-width: 92px;

  ${(props) =>
    css`
      background-color: ${props.color};
    `}
`;

const StatusText = styled(Text)`
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #fff;
`;

const StatusBadge = ({ color, children }: StatusBadgeProps) => {
  const breakpoints = useMedia({
    minWidth: { xs: 70, sm: 92 },
    paddingVertical: { xs: 4, sm: 6 },
    paddingHorizontal: { xs: 6, sm: 8 },
  });

  return (
    <ContainerStyled style={breakpoints} color={resolveThemeColor(color)}>
      <StatusText $weight={600}>{children}</StatusText>
    </ContainerStyled>
  );
};

export { StatusBadge };
