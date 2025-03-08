import React from "react";
import { ControlPanel } from "./ui/control-panel/control-panel";
import { Matches } from "./ui/matches/matches";
import { FilterProvider } from "./lib/filter-context";

const HomePage = () => {
  return (
    <FilterProvider>
      <ControlPanel />
      <Matches />
    </FilterProvider>
  );
};

export { HomePage };
