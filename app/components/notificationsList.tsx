import { FlatList, useWindowDimensions } from "react-native";
import NotificationItem from "./notificationItem";
import Header from "./header";
import notifications from "../../assets/data/notifications.js";
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
  withTiming,
} from "react-native-reanimated";
import { useState } from "react";

export default function NotificationsList({
  footerVisibility,
}: {
  footerVisibility: SharedValue<number>;
}) {
  const handler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      const yOffset = contentOffset.y;
      if (yOffset < 10) {
        footerVisibility.value = withTiming(1);
      } else {
        footerVisibility.value = withTiming(0);
      }
    },
  });
  return (
    <Animated.FlatList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<Header />}
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <NotificationItem data={item} index={index} />
      )}
      onScroll={handler}
      scrollEventThrottle={1000 / 60}
    ></Animated.FlatList>
  );
}
