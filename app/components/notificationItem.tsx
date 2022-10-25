import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";

import { NOTIFICATION_HEIGHT } from "../utils/constants";

interface NotificationUIProps {
  data: {
    id: string;
    createdAt: string;
    icon: any;
    title: string;
    subtitle: string;
  };

  index: number;
  listVisibility: Animated.SharedValue<number>;
  scrollY: Animated.SharedValue<number>;
}

export default function NotificationItem({
  data,
  index,
  listVisibility,
  scrollY,
}: NotificationUIProps) {
  const { width, height } = useWindowDimensions();
  const startPosition = NOTIFICATION_HEIGHT * index;
  // 250 is the height of the header, 130 is the height of the footer so this is the notification list height
  const containerHeight = height - 250 - NOTIFICATION_HEIGHT;
  const position1 = startPosition - containerHeight;
  const position2 = startPosition + NOTIFICATION_HEIGHT - containerHeight;

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY:
            interpolate(
              scrollY.value,
              [position1, position2],
              [-50, 0],
              "clamp"
            ) +
            interpolate(
              listVisibility.value,
              [0, 1],
              [containerHeight - startPosition, 0]
            ),
        },
        {
          scale: interpolate(
            scrollY.value,
            [position1, position2],
            [0.6, 1],
            "clamp"
          ),
        },
      ],
      opacity: interpolate(scrollY.value, [position1, position2], [0, 1]),
    };
  });
  return (
    <Animated.View style={animatedStyles}>
      <BlurView
        style={{ width: width - 20, ...styles.container }}
        intensity={25}
        tint="light"
      >
        <Image source={data.icon} style={styles.icon} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.subtitle} numberOfLines={3}>
            {data.subtitle}
          </Text>
        </View>
        <Text style={styles.time}>{data.createdAt}</Text>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: NOTIFICATION_HEIGHT - 10,
    backgroundColor: "#ffffff90",
    margin: 5,
    marginHorizontal: 10,
    padding: 13,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  time: {
    color: "#222222",
    fontSize: 12,
    position: "absolute",
    right: 10,
    top: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    color: "black",
    fontWeight: "500",
    // letterSpacing: 0.2,
  },
  subtitle: {
    color: "black",
    lineHeight: 18,
    // letterSpacing: 0.2,
  },
});
