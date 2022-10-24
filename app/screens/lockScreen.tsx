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
  useAnimatedGestureHandler,
  SensorType,
  interpolate,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { PanGestureHandler } from "react-native-gesture-handler";

// @ts-expect-error
import wallpaper from "../../assets/images/wallpaper.webp";

import Footer from "../components/footer";
import NotificationsList from "../components/notificationsList";

const IMAGE_OFFSET = 100;
const PI = Math.PI;
const HALF_PI = PI / 2;

const clamped = (value, min, max) => {
  "worklet";
  return Math.min(Math.max(value, min), max);
};

export default function LockScreen() {
  const footerVisibility = useSharedValue(1);
  const dragY = useSharedValue(0);

  const { width, height } = useWindowDimensions();

  const sensor = useAnimatedSensor(SensorType.ROTATION);
  const animatedStyles = useAnimatedStyle(() => {
    const { pitch, roll } = sensor.sensor.value;

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

  const animatedDragWindowYStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(dragY.value, {
            duration: 50,
            easing: Easing.linear,
          }),
        },
      ],
    };
  });

  const unlockHandler = useAnimatedGestureHandler({
    onStart: () => {
      console.log("start");
    },
    onActive: (event) => {
      dragY.value = clamped(event.translationY, -height, 0);
    },
    onEnd: () => {
      if (-dragY.value > height / 2) {
        dragY.value = withTiming(-height, { duration: 300 });
      } else {
        dragY.value = withTiming(0, { duration: 300 });
      }
    },
  });
  return (
    <Animated.View style={[styles.window, animatedDragWindowYStyles]}>
      <Image
        source={wallpaper}
        style={[
          {
            width: width + 2 * IMAGE_OFFSET,
            height: height + 2 * IMAGE_OFFSET,
            position: "absolute",
          },
          styles.container,
          animatedStyles,
        ]}
      />
      {/* <PanGestureHandler onGestureEvent={unlockHandler}>
        <Animated.View
          style={{
            position: "absolute",
            width: "100%",
            height: 100,
            backgroundColor: "green",
            top: 0,
            left: 0,
          }}
        />
      </PanGestureHandler> */}

      <NotificationsList footerVisibility={footerVisibility} />
      <Footer footerVisibility={footerVisibility} />
      <PanGestureHandler onGestureEvent={unlockHandler}>
        <Animated.View
          style={{
            position: "absolute",
            width: "100%",
            height: 100,
            backgroundColor: "red",
            bottom: 0,
            left: 0,
          }}
        />
      </PanGestureHandler>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  window: {
    overflow: "hidden",
  },
});
