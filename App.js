import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import wallpaper from "./assets/images/wallpaper.webp";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";

export default function App() {
  return (
    <ImageBackground source={wallpaper} style={styles.container}>
      <StatusBar style="light" />
      <DateAndTime />
      <Footer />
    </ImageBackground>
  );
}

function DateAndTime() {
  let [dateObj, setDateObj] = useState(dayjs());

  let date = dateObj.format("dddd, MMMM D");
  let time = dateObj.format("HH:mm");

  // Update the time every second
  useEffect(() => {
    let timer = setInterval(() => {
      setDateObj(dayjs());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.header}>
      <Ionicons name="ios-lock-closed" size={24} color="white" />
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name="flashlight" size={24} color="white" />
      </View>
      <View style={styles.icon}>
        <Ionicons name="ios-camera" size={24} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    height: 250,
  },
  date: {
    color: "#C3FFFE",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 20,
  },
  time: {
    color: "#C3FFFE",
    fontSize: 82,
    fontWeight: "bold",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    height: 85,
    alignSelf: "stretch",
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  icon: {
    backgroundColor: "#00000050",
    width: 50,
    aspectRatio: 1,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
