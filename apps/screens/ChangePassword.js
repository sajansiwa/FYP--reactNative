import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../constants/AppConstant";
import axios from "axios";
import { sleep } from "./profileScreen";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleChangeCurrentPassword = (text) => {
    setCurrentPassword(text);
  };

  const handleChangeNewPassword = (text) => {
    setNewPassword(text);
  };

  const handleChangeRepeatPassword = (text) => {
    setRepeatPassword(text);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await sleep(2000);
      const payload = {
        currentPassword: currentPassword,
        password: newPassword,
        email: user.email_id,
      };
      const response = await axios.post(`${BASE_URL}updatePassword`, payload);
      setLoading(false);
      alert("Password changed successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Failed to Update Password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <TextInput
        style={styles.input}
        value={currentPassword}
        onChangeText={handleChangeCurrentPassword}
        placeholder="Current Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={handleChangeNewPassword}
        placeholder="New Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={repeatPassword}
        onChangeText={handleChangeRepeatPassword}
        placeholder="Repeat Password"
        secureTextEntry
      />
      {!loading ? (
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#808080",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChangePassword;
