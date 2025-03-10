import React from "react";
import { Team } from "@/entities/match/@x/team";
import type { Player as PlayerType } from "@/entities/match/@x/player";
import styled from "styled-components/native";
import { FloatingCard } from "@/shared/ui/floating-card/floating-card";
import { Statistics } from "@/shared/ui/statistics/statistics";
import { Text } from "@/shared/ui/text/text";
import { Image, StyleProp, ViewStyle } from "react-native";
import { useMedia } from "@/shared/lib/use-media";

const TeamStatisticsDivider = styled.View`
  width: 1px;
  height: 100%;
  background-color: #141a21;
`;

const TeamStatisticsContainer = styled(FloatingCard)`
  padding: 14px 12px;
  flex-direction: row;
  justify-content: space-around;
  background-color: ${(props) => props.theme.colors.dark[400]};
`;

const PlayersContainer = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 8px;
`;

const Container = styled.View`
  flex: 1;
  gap: 8px;
`;

const MatchTeamStatistics = ({ team }: { team: Team }) => {
  const breakpoints = useMedia({ flex: { xs: 1, sm: undefined } });

  return (
    <Container style={breakpoints}>
      <PlayersContainer>
        {team.players.map((p) => (
          <PlayerStatistics key={p.username} player={p} />
        ))}
      </PlayersContainer>
      <TeamStatisticsContainer>
        <Statistics label="Points:">
          {team.points > 0 ? `+${team.points}` : team.points}
        </Statistics>
        <TeamStatisticsDivider />
        <Statistics label="Место:">{team.place}</Statistics>
        <TeamStatisticsDivider />

        <Statistics label="Всего убийств:">{team.totalKills}</Statistics>
      </TeamStatisticsContainer>
    </Container>
  );
};

const Player = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  max-width: 100%;
`;

const Username = styled(Text)`
  flex: 1;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayerContainer = styled(FloatingCard)`
  flex: 1;
  padding: 14px 12px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 15px;
  row-gap: 4px;
  background-color: ${(props) => props.theme.colors.dark[400]};
`;

const PlayerStatistics = ({ player }: { player: PlayerType }) => {
  const breakpoints = useMedia({
    container: { justifyContent: { xs: "center", sm: "space-between" } },
    usename: { fontSize: { xs: 14, sm: 16 } },
    icon: { size: { xs: 32, sm: 36 } },
  });

  return (
    <PlayerContainer style={breakpoints.container as StyleProp<ViewStyle>}>
      <Player>
        <Image
          height={breakpoints.icon.size}
          width={breakpoints.icon.size}
          source={require("./../../../../assets/images/user.png")}
        />
        <Username
          ellipsizeMode="tail"
          numberOfLines={1}
          $weight={600}
          style={breakpoints.usename}
        >
          {player.username}
        </Username>
      </Player>
      <Statistics label="Убийств:">{player.kills}</Statistics>
    </PlayerContainer>
  );
};

export { MatchTeamStatistics };
