import { useScreenSizeValue } from "@/shared/lib/use-sreen-size-value";
import { TeamTemplateIcon } from "@/shared/ui/icons/icons";
import { Text } from "@/shared/ui/text/text";
import React from "react";
import styled, { css } from "styled-components/native";

type MatchTeamProps = {
  name: string;
  type: "home" | "away";
};

const Container = styled.View`
  align-items: center;
  flex-direction: row;
  max-width: 100%;
`;

const Name = styled(Text)<{ $reverseDir?: boolean }>`
  ${(props) =>
    props.$reverseDir &&
    css`
      order: -1;
    `}
`;

const MatchTeam = ({ name, type = "home" }: MatchTeamProps) => {
  const { breakpoints } = useScreenSizeValue();

  const iconSize = breakpoints({ xs: 28, sm: 48 });

  return (
    <Container style={{ gap: breakpoints({ xs: 6, sm: 14 }) }}>
      <TeamTemplateIcon height={iconSize} width={iconSize} />
      <Name
        style={{ fontSize: breakpoints({ xs: 14, sm: 16 }) }}
        $weight={600}
        $reverseDir={type == "away"}
      >
        {name}
      </Name>
    </Container>
  );
};

export { MatchTeam };
