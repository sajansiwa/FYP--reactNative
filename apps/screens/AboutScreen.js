import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default AboutScreen = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <View style={styles.container}>
      <Image
        source={user.photo ?? require("../../assets/logo.jpeg")} // Replace with your own image source
        style={styles.avatar}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email_id}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5", // Set background color
    padding: 16, // Add padding for spacing
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center", // Center align text
  },
  email: {
    fontSize: 16,
    color: "#808080", // Set a different color for email
    textAlign: "center", // Center align text
  },
});