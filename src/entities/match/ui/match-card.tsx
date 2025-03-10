import { FloatingCard } from "@/shared/ui/floating-card/floating-card";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { MatchTeam } from "./match-team";
import { Match } from "../model/match.types";
import { MatchStatus } from "./match-status";
import {
  Platform,
  Pressable,
  StyleProp,
  useWindowDimensions,
  View,
  ViewProps,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ChevronDownIcon } from "@/shared/ui/icons/icons";
import { MatchProvider } from "../lib/match-context";
import { MatchTeamStatistics } from "./match-team-statistics";
import { Text } from "@/shared/ui/text/text";
import { useMedia } from "@/shared/lib/use-media";
import { useBreakpoints } from "@/shared/lib/breakpoints";

const Container = styled(FloatingCard)`
  flex-direction: column;
  flex: 1;
  flex-basis: unset;
`;

const MainCardWrapper = styled.Pressable`
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;

const MainCardContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const MatchDetails = styled.View`
  width: 100%;
`;

const MatchCard = ({ data }: { data: Match }) => {
  const { width } = useWindowDimensions();
  const height = useSharedValue(0);
  const { homeTeam, homeScore, awayTeam, awayScore, status } = data;
  const [expanded, setExpanded] = useState<boolean>(false);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  const toggleExpand = () => {
    height.value = withTiming(expanded ? 0 : measuredHeight, { duration: 300 });
    setExpanded(!expanded);
  };

  const breakpoints = useBreakpoints();

  const media = useMedia({
    container: {
      paddingHorizontal: { xs: 8, sm: 36 },
      paddingVertical: { xs: 8, sm: 16 },
    },
    mainCardWrapper: { paddingBottom: { xs: expanded ? 16 : 0 } },
    matchDetails: {
      flexDirection: { xs: "column", sm: "row" },
      padding: { xs: 0, sm: 12 },
      paddingTop: { xs: 16, sm: 48 },
      gap: { xs: 8, sm: 32 },
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: "hidden",
  }));

  useEffect(() => {
    height.value = withTiming(expanded ? measuredHeight : 0, { duration: 300 });
  }, [width]);

  return (
    <MatchProvider match={data}>
      <Container style={media.container}>
        <MainCardWrapper
          style={media.mainCardWrapper}
          onPress={toggleExpand.bind(null)}
        >
          <MainCardContainer>
            <MatchTeam name={homeTeam.name} type="home" />
            <MatchStatus
              homeScore={homeScore}
              awayScore={awayScore}
              status={status}
            />
            <MatchTeam name={awayTeam.name} type="away" />
          </MainCardContainer>
          {breakpoints != "xs" && <ExpandIcon expanded={expanded} />}
        </MainCardWrapper>
        <Animated.View style={animatedStyle}>
          <MatchDetails
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setMeasuredHeight(Platform.OS === "ios" ? 309 : height);
            }}
            style={[
              media.matchDetails as StyleProp<ViewProps>,
              {
                height: Platform.OS === "ios" ? "100%" : undefined,
              },
            ]}
          >
            <MatchTeamStatistics team={homeTeam} />
            {breakpoints == "xs" && <MobileVersus />}
            <MatchTeamStatistics team={awayTeam} />
          </MatchDetails>
        </Animated.View>
        {breakpoints == "xs" && (
          <Pressable
            onPress={toggleExpand.bind(null)}
            style={{ marginHorizontal: "auto", paddingTop: 8 }}
          >
            <ExpandIcon expanded={expanded} />
          </Pressable>
        )}
      </Container>
    </MatchProvider>
  );
};

const VersusContainer = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const VersusLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: #13181f;
`;

const VersusLabel = styled(Text)`
  color: #313a47;
  font-size: 14px;
`;

const MobileVersus = () => {
  return (
    <VersusContainer>
      <VersusLine />
      <VersusLabel $weight={600}>VS</VersusLabel>
      <VersusLine />
    </VersusContainer>
  );
};

const ExpandIcon = ({ expanded }: { expanded?: boolean }) => {
  const rotation = useSharedValue("0deg");

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: rotation.value }],
  }));

  useEffect(() => {
    rotation.value = withSpring(expanded ? "180deg" : "0deg", {
      duration: 200,
    });
  }, [expanded]);

  return (
    <View>
      <Animated.View style={animatedStyle}>
        <ChevronDownIcon color={"#FFF"} />
      </Animated.View>
    </View>
  );
};

export { MatchCard };
