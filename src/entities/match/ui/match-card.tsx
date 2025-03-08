import { FloatingCard } from "@/shared/ui/floating-card/floating-card";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { MatchTeam } from "./match-team";
import { Match } from "../model/match.types";
import { MatchStatus } from "./match-status";
import { useScreenSizeValue } from "@/shared/lib/use-sreen-size-value";
import { Platform, Pressable, useWindowDimensions, View } from "react-native";
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
  const { homeTeam, homeScore, awayTeam, awayScore, status } = data;
  const { breakpoints } = useScreenSizeValue();
  const [expanded, setExpanded] = useState<boolean>(false);
  const { width } = useWindowDimensions();

  const height = useSharedValue(0);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  const toggleExpand = () => {
    height.value = withTiming(expanded ? 0 : measuredHeight, { duration: 300 });
    setExpanded(!expanded);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: "hidden",
  }));

  useEffect(() => {
    height.value = withTiming(expanded ? measuredHeight : 0, { duration: 300 });
  }, [width]);

  return (
    <MatchProvider match={data}>
      <Container
        style={{
          paddingHorizontal: breakpoints({ xs: 8, sm: 36 }),
          paddingVertical: breakpoints({ xs: 8, sm: 16 }),
        }}
      >
        <MainCardWrapper
          style={{
            paddingBottom: breakpoints({ xs: expanded ? 16 : 0 }),
          }}
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
          {breakpoints({ xs: null, sm: <ExpandIcon expanded={expanded} /> })}
        </MainCardWrapper>
        <Animated.View style={animatedStyle}>
          <MatchDetails
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setMeasuredHeight(Platform.OS === "ios" ? 309 : height);
            }}
            style={{
              flexDirection: breakpoints({ xs: "column", sm: "row" }),
              padding: breakpoints({ xs: 0, sm: 12 }),
              gap: breakpoints({ xs: 8, sm: 32 }),
              height: Platform.OS === "ios" ? "100%" : undefined,
            }}
          >
            <MatchTeamStatistics team={homeTeam} />
            {breakpoints({
              xs: <MobileVersus />,
              sm: null,
            })}
            <MatchTeamStatistics team={awayTeam} />
          </MatchDetails>
        </Animated.View>
        {breakpoints({
          xs: (
            <Pressable
              onPress={toggleExpand.bind(null)}
              style={{ marginHorizontal: "auto", paddingTop: 8 }}
            >
              <ExpandIcon expanded={expanded} />
            </Pressable>
          ),
          sm: null,
        })}
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
