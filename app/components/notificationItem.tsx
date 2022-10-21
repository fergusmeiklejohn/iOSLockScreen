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
  withTiming,
} from "react-native-reanimated";

export const NOTIFICATION_HEIGHT = 80;

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
}

export default function NotificationItem({
  data,
  index,
  listVisibility,
}: NotificationUIProps) {
  const { width, height } = useWindowDimensions();
  const startPosition = NOTIFICATION_HEIGHT * index;

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // 250 is the height of the header, so we animate down the screen height - header height
      transform: [
        {
          translateY: interpolate(
            listVisibility.value,
            [0, 1],
            [height - 250 - startPosition, 0]
          ),
        },
        {
          scale: interpolate(listVisibility.value, [0, 1], [0.8, 1]),
        },
      ],
      opacity: interpolate(listVisibility.value, [0, 1], [0.3, 1]),
    };
  });
  return (
    <Animated.View
      style={[{ width: width - 20, ...styles.container }, animatedStyles]}
    >
      <Image source={data.icon} style={styles.icon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          {data.subtitle}
        </Text>
      </View>
      <Text style={styles.time}>{data.createdAt} ago</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: NOTIFICATION_HEIGHT - 10,
    backgroundColor: "#ffffff90",
    margin: 5,
    marginHorizontal: 10,
    padding: 13,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
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
