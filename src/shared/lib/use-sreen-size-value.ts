import { useWindowDimensions } from "react-native";

type ScreenWidthValues<T> = {
  xs: T;
  sm?: T;
  md?: T;
};

function ifNotUndefined(value: any, additionalValue?: any) {
  if (value === undefined) {
    return additionalValue;
  }

  return value;
}

export const useScreenSizeValue = () => {
  const { width } = useWindowDimensions();

  function resolveScreenWidthValue<V>(values: ScreenWidthValues<V>): V {
    if (width < 768) {
      return values.xs;
    } else if (width > 768 && width < 900) {
      return ifNotUndefined(values.sm, values.xs);
    } else {
      return ifNotUndefined(ifNotUndefined(values.md, values.sm), values.xs);
    }
  }

  return {
    breakpoints: resolveScreenWidthValue,
  };
};
