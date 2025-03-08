import { useStrictContext } from "@/shared/lib/use-strict-context";
import React, { createContext, ReactNode } from "react";
import { Match } from "../model/match.types";

const MatchContext = createContext<Match | null>(null);

const MatchProvider = ({
  children,
  match,
}: {
  match: Match;
  children: ReactNode;
}) => {
  return (
    <MatchContext.Provider value={match}>{children}</MatchContext.Provider>
  );
};

const useMatch = () => useStrictContext(MatchContext);

export { MatchProvider, useMatch };
