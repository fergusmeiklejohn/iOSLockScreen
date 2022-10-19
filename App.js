import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground } from "react-native";

import wallpaper from "./assets/images/wallpaper.webp";

import DateAndTime from "./components/dateAndTime";
import Footer from "./components/footer";

export default function App() {
  return (
    <ImageBackground source={wallpaper} style={styles.container}>
      <StatusBar style="light" />
      <DateAndTime />
      <Footer />
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
