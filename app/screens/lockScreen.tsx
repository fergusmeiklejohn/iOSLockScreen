import React from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  useWindowDimensions,
  Image,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedSensor,
  useAnimatedStyle,
  SensorType,
  interpolate,
  withTiming,
} from "react-native-reanimated";

// @ts-expect-error
import wallpaper from "../../assets/images/wallpaper.webp";

import Footer from "../components/footer";
import NotificationsList from "../components/notificationsList";

const IMAGE_OFFSET = 100;
const PI = Math.PI;
const HALF_PI = PI / 2;

export default function LockScreen() {
  const footerVisibility = useSharedValue(1);
  const { width, height } = useWindowDimensions();

  const sensor = useAnimatedSensor(SensorType.ROTATION);
  const animatedStyles = useAnimatedStyle(() => {
    const { pitch, roll, yaw } = sensor.sensor.value;
    // console.log({
    //   pitch: pitch.toFixed(1),
    //   roll: roll.toFixed(1),
    //   yaw: yaw.toFixed(1),
    // });

    return {
      top: withTiming(
        interpolate(pitch, [-HALF_PI, HALF_PI], [-IMAGE_OFFSET * 2, 0]),
        { duration: 100 }
      ),
      left: withTiming(interpolate(roll, [-PI, PI], [-IMAGE_OFFSET * 2, 0]), {
        duration: 100,
      }),
    };
  });
  return (
    <>
      <Animated.Image
        source={wallpaper}
        style={[
          {
            width: width + 2 * IMAGE_OFFSET,
            height: height + 2 * IMAGE_OFFSET,
            position: "absolute",
          },
          animatedStyles,
        ]}
      />
      <View style={styles.container}>
        <NotificationsList footerVisibility={footerVisibility} />
        <Footer footerVisibility={footerVisibility} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});
