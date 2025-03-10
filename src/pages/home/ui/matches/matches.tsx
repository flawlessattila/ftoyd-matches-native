import { MatchCard, MatchCardSkeleton } from "@/entities/match";
import { useMatches, useMatchesWithSocket } from "@/entities/match";
import React, { useMemo } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useFilter } from "../../lib/filter-context";
import { useMedia } from "@/shared/lib/use-media";

const MatchesSeparator = () => {
  const breakpoints = useMedia({ paddingTop: { xs: 8, sm: 12 } });
  return <View style={breakpoints} />;
};

const Matches = () => {
  const { data, isFetching } = useMatches();
  useMatchesWithSocket();
  const { filter } = useFilter();

  const matches = useMemo(() => {
    if (!filter.status) {
      return data;
    }
    return data?.filter((m) => m.status == filter.status);
  }, [data, filter]);

  if (!matches && isFetching) {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Array(8).map((_, i) => (i + 1).toString())}
        renderItem={({ item }) => <MatchCardSkeleton key={item} />}
        ItemSeparatorComponent={MatchesSeparator}
      />
    );
  }

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
