import { useMemo } from "react";
import { breakpoints, useBreakpoints } from "./breakpoints";
import { StyleProp, ViewStyle } from "react-native";

type BreakpointKey = keyof typeof breakpoints;
type BreakpointValue<T> = T | null | undefined;
type BreakpointConfig<T> =
  | {
      [KEY in string]:
        | { [key in BreakpointKey]?: BreakpointValue<T> }
        | BreakpointValue<T>
        | BreakpointConfig<T>;
    };

type UseMediaReturnType<T> = {
  [K in keyof T]: T[K] extends { [key in BreakpointKey]?: infer U }
    ? U
    : T[K] extends BreakpointConfig<any>
    ? UseMediaReturnType<T[K]>
    : T[K];
};

const firstNotUndefined = (value: any, ...args: any[]) => {
  if (value === undefined && args.length > 0) {
    return firstNotUndefined(args[0], ...args.slice(1));
  }

  return value;
};

const getValueForBreakpoint = (
  obj: {
    [key in BreakpointKey]?: BreakpointValue<any>;
  },
  breakpoint: BreakpointKey
): any => {
  switch (breakpoint) {
    case "md":
      return firstNotUndefined(obj.md, obj.sm);
    case "sm":
      return firstNotUndefined(obj.sm, obj.xs);
    case "xs":
      return firstNotUndefined(obj.xs);
  }
};

const processConfig = (config: any, breakpoint: BreakpointKey): any => {
  const result: any = {};
  for (const key in config) {
    if (typeof config[key] === "object" && !Array.isArray(config[key])) {
      if (
        config[key].xs !== undefined ||
        config[key].sm !== undefined ||
        config[key].md !== undefined
      ) {
        // Это объект с брейкпоинтами
        result[key] = getValueForBreakpoint(config[key], breakpoint);
      } else {
        // Это вложенный объект, который нужно обработать рекурсивно
        result[key] = processConfig(config[key], breakpoint);
      }
    } else {
      // Это обычное значение
      result[key] = config[key];
    }
  }
  return result;
};

function useMedia<T extends BreakpointConfig<any>>(
  config: T
): UseMediaReturnType<T> {
  const breakpoint = useBreakpoints();

  const mediaStyles = useMemo(() => {
    return processConfig(config, breakpoint);
  }, [breakpoint]);

  return mediaStyles;
}

export { useMedia };
