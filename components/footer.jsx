import { View, StyleSheet } from "react-native";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";

export default function Footer() {
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
  })