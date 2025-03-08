import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

export const useAnimatedNumber = (number: number) => {
  const animatedValue = useRef(new Animated.Value(number)).current;
  const [displayScore, setDisplayScore] = useState(number);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: number,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    const listener = animatedValue.addListener(({ value }) => {
      setDisplayScore(Math.round(value));
    });

    return () => animatedValue.removeListener(listener);
  }, [number]);

  return {
    number: displayScore,
  };
};
