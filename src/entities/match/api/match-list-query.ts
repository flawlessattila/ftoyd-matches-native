import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { Match } from "../model/match.types";
import { customFetch } from "@/shared/lib/custom-fetch";
import { useEffect } from "react";

function matchesMap(m: any) {
  return {
    ...m,
    awayTeam: { totalKills: m.awayTeam.total_kills, ...m.awayTeam },
    homeTeam: { totalKills: m.homeTeam.total_kills, ...m.homeTeam },
  };
}

export const matchQueryOptions = queryOptions({
  queryKey: ["matches"],
  queryFn: async (): Promise<Match[]> => {
    const response = await customFetch(
      `${process.env.EXPO_PUBLIC_API_ORIGIN}/fronttemp`,
      { cache: "no-store" }
    );

    const json = await response.json();
    if (response.status > 299 || !json.ok) {
      throw new Error("wrong-status");
    }

    return json.data.matches.map(matchesMap);
  },
});

export const useMatches = () => {
  return useQuery(matchQueryOptions);
};

export const useMatchesWithSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(process.env.EXPO_PUBLIC_WSS_ORIGIN!);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const matches: Match[] = data.data;

      queryClient.setQueryData(["matches"], matches.map(matchesMap));
    };

    return () => ws.close();
  }, []);
};
