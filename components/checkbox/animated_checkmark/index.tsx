import React, { useRef, useState } from "react";
import Animated, {
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";
import { Path } from "react-native-svg";

type AnimatedCheckMarkProps = {
  progress: SharedValue<number>;
  color?: string;
};

const AnimatedPath = Animated.createAnimatedComponent(Path);

export function AnimatedCheckMark({
  progress,
  color = "#FFFFFF",
}: AnimatedCheckMarkProps) {
  const pathRef = useRef<Path>(null);
  const [length, setLength] = useState<number>(0);

  const checkMarrkAnimation = useAnimatedProps(() => ({
    strokeDashoffset: length - length * progress.value,
    opacity: progress.value,
  }));

  return (
    <AnimatedPath
      animatedProps={checkMarrkAnimation}
      onLayout={() => setLength(pathRef.current?.getTotalLength()!)}
      ref={pathRef}
      d="M12 24.4068L20.6667 32.9999L36.5 17.1667"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={length}
      testID="animated-checkmark"
    />
  );
}
