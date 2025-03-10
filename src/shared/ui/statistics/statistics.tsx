import React, { ReactNode } from "react";
import styled from "styled-components/native";
import { Text } from "../text/text";
import { useMedia } from "@/shared/lib/use-media";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Label = styled(Text)`
    color: ${(props) => props.theme.colors.grey[50]}
    opacity: 0.4
`;

const Value = styled(Text)`
  color: ${(props) => props.theme.colors.light[500]};
`;

const Statistics = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const breakpoints = useMedia({
    label: { fontSize: { xs: 12, sm: 14 } },
    value: { fontSize: { xs: 14, sm: 16 } },
  });

  return (
    <Container>
      <Label style={breakpoints.label} $weight={400}>
        {label}
      </Label>
      <Value style={breakpoints.value} $weight={600}>
        {children}
      </Value>
    </Container>
  );
};

export { Statistics };
