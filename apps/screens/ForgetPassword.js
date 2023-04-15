import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
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
import { object, string, number, date, InferType } from "yup";

const forgetPasswordSchema = object({
  email_id: string().email().required(),
});

const ForgetPassword = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // const isloggedIn = ((state) => state.)

  const handleSubmit = async () => {
    const payload = {
      email_id: email,
    };

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}passwordreset`, payload);
      alert(response.data.message);
    } catch (error) {
      // showToast({ message: error });s
      alert(response.data.message);
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ email_id: "" }}
      validationSchema={forgetPasswordSchema}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Reset Password</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email Address"
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <View style={styles.height}></View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            title="Reset Password"
            onPress={handleSubmit}
            style={styles.button}
          />
        )}
      </View>
    </Formik>
  );
};

const styles = StyleSheet.create({
  height: {
    margin: 10,
  },
  forgetPassword: {
    marginTop: 20,
    marginBottom: 20,
  },
  forgetPasswordText: {
    color: "blue",
    textAlign: "right",
    alignItems: "flex-end",

    textDecorationLine: "underline",
  },
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
    marginTop: 20,
    padding: 10,
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

export default ForgetPassword;
