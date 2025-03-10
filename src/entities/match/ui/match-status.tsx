import React from "react";
import { EMatchStatus } from "../model/match.types";
import { StatusBadge } from "@/shared/ui/status-badge/status-badge";
import styled from "styled-components/native";
import { Text } from "@/shared/ui/text/text";
import { useAnimatedNumber } from "@/shared/lib/use-animated-number";
import { useMedia } from "@/shared/lib/use-media";

type MatchStatusProps = {
  homeScore: number;
  awayScore: number;
  status: EMatchStatus;
};

const Container = styled.View`
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const Score = styled(Text)`
  font-size: 20px;
  line-height: 24px;
`;

const getMatchStatusBadge = (status: EMatchStatus) => {
  switch (status) {
    case EMatchStatus.Ongoing:
      return <StatusBadge color="success">Live</StatusBadge>;
    case EMatchStatus.Finished:
      return <StatusBadge color="primary">Finished</StatusBadge>;
    case EMatchStatus.Scheduled:
      return <StatusBadge color="warning">Match preparing</StatusBadge>;
  }
};

const MatchStatus = ({ homeScore, awayScore, status }: MatchStatusProps) => {
  const breakpoints = useMedia({ fontSize: { xs: 14, sm: 20 } });
  const { number: scoreLeft } = useAnimatedNumber(homeScore);
  const { number: scoreRight } = useAnimatedNumber(awayScore);

  return (
    <Container>
      <Score
        style={breakpoints}
        $weight={600}
      >{`${scoreLeft} : ${scoreRight}`}</Score>
      {getMatchStatusBadge(status)}
    </Container>
  );
};

export { MatchStatus };
