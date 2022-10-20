import { View, StyleSheet, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { transform } from "typescript";

export default function Footer() {
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
  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={styles.footer}
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
    aspectRatio: 1,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
