import { MatchCard } from "@/entities/match";
import { useMatches, useMatchesWithSocket } from "@/entities/match";
import { useScreenSizeValue } from "@/shared/lib/use-sreen-size-value";
import React, { useMemo } from "react";
import { View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { useFilter } from "../../lib/filter-context";

const MatchesSeparator = () => {
  const { breakpoints } = useScreenSizeValue();
  return <View style={{ paddingTop: breakpoints({ xs: 8, sm: 12 }) }} />;
};

const Matches = () => {
  const { data, isFetching } = useMatches();
  useMatchesWithSocket();
  const { filter } = useFilter();

  const matches = useMemo(() => {
    if (!filter.status) {
      return data;
    }
    return data.filter((m) => m.status == filter.status);
  }, [data, filter]);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={matches}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => <MatchCard key={item.title} data={item} />}
      ItemSeparatorComponent={MatchesSeparator}
      style={{ opacity: isFetching ? 0.8 : 1 }}
    />
  );
};

export { Matches };
