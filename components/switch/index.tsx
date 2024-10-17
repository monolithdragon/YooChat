import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import Animated, {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";
import { useToggle } from "@/hooks/useToggle";

type SwithProps = {
  width: number;
  height: number;
  activeColor: string;
  inactiveColor: string;
  onPress?: () => void;
};

export default function Switch({
  width,
  height,
  activeColor,
  inactiveColor,
  onPress,
}: SwithProps) {
  const [active, setActive] = useToggle(false);
  const switchTranslate = useSharedValue(0);

  const styles = createstyles(width, height);
  const animatedValue = width - height;

  useEffect(() => {
    switchTranslate.value = active ? animatedValue : 0;
  }, [active, switchTranslate]);

  const progress = useDerivedValue(() => {
    return withTiming(active ? animatedValue : 0);
  });

  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, animatedValue],
      [inactiveColor, activeColor]
    );
    return { backgroundColor };
  });

  const springStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(switchTranslate.value, {
            mass: 1,
            damping: 15,
            stiffness: 120,
            overshootClamping: false,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001,
          }),
        },
      ],
    };
  });

  useEffect(() => {
    if (active) {
      onPress?.();
    }
  }, [active]);

  return (
    <TouchableWithoutFeedback onPress={setActive}>
      <Animated.View
        testID="switch-container"
        style={[styles.container, backgroundColorStyle]}
      >
        <Animated.View
          testID="switch-circle"
          style={[styles.circle, springStyle]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const createstyles = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      width: width,
      height: height,
      borderRadius: 30,
      justifyContent: "center",
      paddingHorizontal: 2,
    },
    circle: {
      width: height - 4,
      height: height - 4,
      backgroundColor: "#FFFFFF",
      borderRadius: 30,
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2.5,
      elevation: 4,
    },
  });
