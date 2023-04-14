import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function showToast(props) {
  const { message } = props;
  ToastAndroid.show(message, ToastAndroid.SHORT);
}

import { Login } from "../redux/slice";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../../constants/AppConstant";

const LoginForm = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // const isloggedIn = ((state) => state.)

  const handleSubmit = async () => {
    const memail = email.toLowerCase();
    const loginPayload = {
      email_id: memail,
      password: password,
    };
    console.log(loginPayload);

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}Login`, loginPayload);
      const responseData = response.data;
      console.log(response.data);

      if (response.data.loggedIn) {
        navigation.navigate("homestack", { replace: true });
        dispatch(Login(responseData));
        setLoading(false);
      }
    } catch (error) {
      // showToast({ message: error });s
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Log in</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email Address"
        autoCompleteType="email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        autoCompleteType="password"
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Log in" onPress={handleSubmit} style={styles.button} />
      )}
      <View style={styles.signupContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("SignupForm")}>
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0FBFC",
    paddingHorizontal: 20,
  },
  heading: {
    color: "#1B1B1B",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "#1B1B1B",
    backgroundColor: "#F0F8FF",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: "#1B1B1B",
  },
  button: {
    marginTop: 20,
    width: "50%",
  },
  signupContainer: {
    position: "absolute",
    bottom: 30,
  },
  signup: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 20,
  },
});

export default LoginForm;
