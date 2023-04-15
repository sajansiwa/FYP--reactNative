import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { BASE_URL, IMAGE_URL } from "../../constants/AppConstant";
import { useIsFocused } from "@react-navigation/native";

export default AboutScreen = () => {
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getprofileInfo();
  }, [isFocused]);

  const mUser = useSelector((state) => state.auth.user);
  async function getprofileInfo() {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}user`, {
        params: {
          email: mUser.email_id,
        },
      });
      setUser(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email_id}</Text>
          <Text style={styles.phoneNumber}>{user.phone_number}</Text>
          <Text style={styles.address}>{user.address}</Text>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
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
    textAlign: "center",
  },
  email: {
    fontSize: 16,
    color: "#808080",
    textAlign: "center",
  },
  phoneNumber: {
    fontSize: 16,
    color: "#808080",
    textAlign: "center",
    marginTop: 8,
  },
  address: {
    fontSize: 16,
    color: "#808080",
    textAlign: "center",
    marginTop: 8,
  },
});
