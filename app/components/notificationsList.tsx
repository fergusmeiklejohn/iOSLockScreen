import { FlatList, useWindowDimensions } from "react-native";
import NotificationItem from "./notificationItem";
import Header from "./header";
import notifications from "../../assets/data/notifications.js";
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useState } from "react";

export default function NotificationsList({
  footerVisibility,
}: {
  footerVisibility: SharedValue<number>;
}) {
  const listVisibility = useSharedValue(1);

  const handler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      const yOffset = contentOffset.y;
      if (yOffset < 10) {
        footerVisibility.value = withTiming(1, { duration: 400 });
      } else {
        footerVisibility.value = withTiming(0, { duration: 400 });
      }
    },
    onBeginDrag(event, context) {
      // drag up brings back notifications if they are hidden
      if (listVisibility.value < 1) {
        listVisibility.value = withSpring(1);
      }
    },
    onEndDrag(event, context) {
      // drag down and release hides notifications
      if (event.contentOffset.y < -50) {
        listVisibility.value = withTiming(0, { duration: 400 });
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
        <NotificationItem
          data={item}
          index={index}
          listVisibility={listVisibility}
        />
      )}
      onScroll={handler}
      scrollEventThrottle={1000 / 60}
    ></Animated.FlatList>
  );
}
