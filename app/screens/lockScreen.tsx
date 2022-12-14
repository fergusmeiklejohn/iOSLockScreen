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
  useAnimatedProps,
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
import { BlurView } from "expo-blur";

const IMAGE_OFFSET = 100;
const PI = Math.PI;
const HALF_PI = PI / 2;

const clamped = (value, min, max) => {
  "worklet";
  return Math.min(Math.max(value, min), max);
};

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function LockScreen() {
  const { width, height } = useWindowDimensions();
  const footerVisibility = useSharedValue(1);
  const dragY = useSharedValue(height);

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
          translateY: withTiming(-(height - dragY.value), {
            duration: 150,
            easing: Easing.linear,
          }),
        },
      ],
    };
  });

  const unlockHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      dragY.value = clamped(event.absoluteY, 0, height);
    },
    onEnd: (event) => {
      if (event.velocityY > 500) {
        if (dragY.value < height / 2) {
          dragY.value = withTiming(0, { duration: 50, easing: Easing.linear });
        } else {
          dragY.value = withTiming(height, {
            duration: 50,
            easing: Easing.linear,
          });
        }
      } else {
        if (dragY.value < height / 2) {
          dragY.value = withTiming(0, { duration: 50, easing: Easing.linear });
        } else {
          dragY.value = withTiming(height, {
            duration: 50,
            easing: Easing.linear,
          });
        }
      }
    },
  });

  const homeScreenAnimatedBlur = useAnimatedProps(() => ({
    intensity: interpolate(dragY.value, [0, height], [0, 100]),
  }));
  const lockScreenAnimatedBlur = useAnimatedProps(() => ({
    intensity: interpolate(dragY.value, [0, height], [100, 0]),
  }));

  return (
    <AnimatedBlurView animatedProps={homeScreenAnimatedBlur}>
      <Animated.View style={[animatedDragWindowYStyles]}>
        <ImageBackground
          source={wallpaper}
          style={[
            {
              width: width,
              height: height,
              position: "relative",
            },
            styles.container,
            animatedStyles,
          ]}
        >
          <AnimatedBlurView animatedProps={lockScreenAnimatedBlur}>
            <NotificationsList footerVisibility={footerVisibility} />
            <Footer footerVisibility={footerVisibility} />
          </AnimatedBlurView>
          <PanGestureHandler onGestureEvent={unlockHandler}>
            <Animated.View style={styles.unlockGestureHandler} />
          </PanGestureHandler>
        </ImageBackground>
      </Animated.View>
    </AnimatedBlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  unlockGestureHandler: {
    position: "absolute",
    width: "100%",
    height: 200,
    bottom: 0,
    left: 0,
    transform: [{ translateY: 100 }],
  },
});
