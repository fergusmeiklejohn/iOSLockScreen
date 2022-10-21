import { View, StyleSheet, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  interpolate,
  SharedValue,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function Footer({
  footerVisibility,
}: {
  footerVisibility: SharedValue<number>;
}) {
  const animatedStyles = useAnimatedStyle(() => {
    // text bounces up and down slightly and repeatedly
    return {
      transform: [
        {
          translateY: withRepeat(
            withSequence(
              withTiming(-10),
              withDelay(1500, withTiming(0)),
              withTiming(-15)
            ),
            -1,
            true
          ),
        },
      ],
      opacity: withRepeat(
        withSequence(
          withDelay(1500, withTiming(0)),
          withDelay(300, withTiming(1))
        ),
        -1,
        true
      ),
    };
  });

  const animatedFooterStyles = useAnimatedStyle(() => {
    return {
      marginTop: interpolate(footerVisibility.value, [0, 1], [-85, 0]),
      opacity: footerVisibility.value,
    };
  });
  return (
    <Animated.View
      entering={SlideInDown}
      style={[styles.footer, animatedFooterStyles]}
    >
      <View style={styles.icon}>
        <MaterialCommunityIcons name="flashlight" size={24} color="white" />
      </View>
      <Animated.Text style={[styles.swipeUpText, animatedStyles]}>
        Swipe up to open
      </Animated.Text>
      <View style={styles.icon}>
        <Ionicons name="ios-camera" size={24} color="white" />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    height: 85,
    alignSelf: "stretch",
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  swipeUpText: {
    color: "white",
    fontWeight: "600",
    alignSelf: "flex-end",
    letterSpacing: 0.5,
  },
  icon: {
    backgroundColor: "#00000050",
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
