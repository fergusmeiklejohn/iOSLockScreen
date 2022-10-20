import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import wallpaper from "./assets/images/wallpaper.webp";

import Footer from "./app/components/footer";
import NotificationsList from "./app/components/notificationsList";

export default function App() {
  const footerVisibility = useSharedValue(1);
  return (
    <ImageBackground source={wallpaper} style={styles.container}>
      <StatusBar style="light" />
      <NotificationsList footerVisibility={footerVisibility} />
      <Footer footerVisibility={footerVisibility} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
