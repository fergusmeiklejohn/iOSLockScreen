import { FlatList, useWindowDimensions } from "react-native";
import NotificationItem from "./notificationItem";
import Header from "./header";
import notifications from "../../assets/data/notifications.js";

export default function NotificationsList({ flatListProps }) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<Header />}
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <NotificationItem data={item} index={index} />
      )}
    ></FlatList>
  );
}
