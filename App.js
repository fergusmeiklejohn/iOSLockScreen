import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import LockScreen from "./app/screens/lockScreen";

export default function App() {
  return (
    <>
      <LockScreen />
      <StatusBar style="light" />
    </>
  );
}
