import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
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

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    marginTop: 20,
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
});
