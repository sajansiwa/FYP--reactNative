import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { BASE_URL, IMAGE_URL } from "../../constants/AppConstant";

export default AboutScreen = () => {
  const [user, setUser] = useState({});
  const mUser = useSelector((state) => state.auth.user);
  async function getprofileInfo() {
    try {
      const res = await axios.get(`${BASE_URL}user`, {
        params: {
          email: mUser.email_id,
        },
      });
      setUser(res.data);
      console.log(`image is ${user.image}`);
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    getprofileInfo();
  }, []);
  return (
    <View style={styles.container}>
      {user.image !== null && user.image !== undefined && user.image !== "" ? (
        <Image
          // source={`${user?.image}` ?? require("../../assets/logo.jpeg")}
          source={{
            uri: user.image,
          }}
          style={styles.avatar}
        />
      ) : (
        <Image
          source={require("../../assets/logo.jpeg")}
          style={styles.avatar}
        />
      )}
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
