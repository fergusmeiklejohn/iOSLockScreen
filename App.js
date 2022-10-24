import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Image } from "react-native";
import LockScreen from "./app/screens/lockScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import home2 from "./assets/images/home2.jpg";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Image
        source={home2}
        style={{ width: "100%", height: "100%", ...StyleSheet.absoluteFill }}
      />
      <LockScreen />
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
