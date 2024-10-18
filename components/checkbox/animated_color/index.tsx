import Animated, {
  createAnimatedPropAdapter,
  interpolateColor,
  processColor,
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";
import { Path } from "react-native-svg";

type AnimatedColorProps = {
  progress: SharedValue<number>;
  color: {
    active: string;
    fill: string;
    stroke: string;
  };
};

const AnimatedPath = Animated.createAnimatedComponent(Path);

export function AnimatedColor({ progress, color }: AnimatedColorProps) {
  const adapter = createAnimatedPropAdapter(
    (props) => {
      if (Object.keys(props).includes("fill")) {
        props.fill = { type: 0, payload: processColor(props.fill) };
      }
      if (Object.keys(props).includes("stroke")) {
        props.stroke = { type: 0, payload: processColor(props.stroke) };
      }
    },
    ["fill", "stroke"]
  );

  const animation = useAnimatedProps(
    () => ({
      fill: interpolateColor(
        progress.value,
        [0, 1],
        [color.fill, color.active]
      ),
      stroke: interpolateColor(
        progress.value,
        [0, 1],
        [color.stroke, color.active]
      ),
    }),
    [],
    adapter
  );

  return (
    <AnimatedPath
      animatedProps={animation}
      d="M2 16C2 8.26801 8.26801 2 16 2H33C40.732 2 47 8.26801 47 16V33C47 40.732 40.732 47 33 47H16C8.26801 47 2 40.732 2 33V16Z"
      strokeWidth="4"
      testID="animated-colorPath"
    />
  );
}
