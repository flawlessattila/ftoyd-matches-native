import React, { createContext, ReactNode, useMemo, useState } from "react";
import { useStrictContext } from "./use-strict-context";
import { useWindowDimensions } from "react-native";

type Breakpoint = "xs" | "sm" | "md";

const BreakpointsContext = createContext<Breakpoint | null>(null);

export const breakpoints = {
  xs: 0,
  sm: 768,
  md: 900,
};

function resolveBreakpoint(width: number): Breakpoint {
  if (width <= breakpoints.sm) {
    return "xs";
  } else if (width <= breakpoints.md) {
    return "sm";
  } else {
    return "md";
  }
}

const BreakpointsProvider = ({ children }: { children: ReactNode }) => {
  const { width } = useWindowDimensions();

  const breakpoint = resolveBreakpoint(width);

  return (
    <BreakpointsContext.Provider value={breakpoint}>
      {children}
    </BreakpointsContext.Provider>
  );
};

const useBreakpoints = () => useStrictContext(BreakpointsContext);

export { BreakpointsProvider, useBreakpoints };
