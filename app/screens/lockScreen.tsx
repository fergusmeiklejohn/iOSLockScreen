import { StyleSheet, ImageBackground } from "react-native";
import { useSharedValue } from "react-native-reanimated";

// @ts-expect-error
import wallpaper from "../../assets/images/wallpaper.webp";

import Footer from "../components/footer";
import NotificationsList from "../components/notificationsList";

export default function LockScreen() {
  const footerVisibility = useSharedValue(1);
  return (
    <ImageBackground source={wallpaper} style={styles.container}>
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
