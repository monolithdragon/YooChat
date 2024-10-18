import { TouchableWithoutFeedback } from "react-native";
import React, { useEffect } from "react";
import Svg from "react-native-svg";
import { useToggle } from "@/hooks/useToggle";
import { useDerivedValue, withTiming } from "react-native-reanimated";
import { AnimatedColor } from "./animated_color";
import { AnimatedCheckMark } from "./animated_checkmark";

type CheckboxProps = {
  size: number;
  color: {
    active: string;
    fill: string;
    stroke: string;
    checkMark?: string;
  };
  onPress?: () => void;
};

export default function Checkbox({ size, color, onPress }: CheckboxProps) {
  const [checked, setChecked] = useToggle(false);

  const progress = useDerivedValue(() => {
    return withTiming(checked ? 1 : 0);
  });

  useEffect(() => {
    if (checked) {
      onPress?.();
    }
  }, [checked]);

  return (
    <TouchableWithoutFeedback onPress={setChecked}>
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="currentColor"
        testID="checkbox-svg"
      >
        <AnimatedColor
          progress={progress}
          color={{
            active: color.active,
            fill: color.fill,
            stroke: color.stroke,
          }}
        />
        <AnimatedCheckMark progress={progress} color={color.checkMark} />
      </Svg>
    </TouchableWithoutFeedback>
  );
}
