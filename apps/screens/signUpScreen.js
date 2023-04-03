import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import axios from "axios";

const SignupForm = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();


  const handleSubmit = async () => {
    const regPayload = {
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      address: address,
      password: password,
    };

    console.log(regPayload);

    try {
      console.log(regPayload);
      const response = await axios.post(
        "http://192.168.31.159:4000/api/signup",
        regPayload
      );
      const responseData = response.data;
      console.log(responseData);

      // dispatch(register(regPayload));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign up</Text>
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
        value={name}
        onChangeText={setName}
        placeholder="Full Name"
        autoCompleteType="name"
      />
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhone}
        placeholder="Phone Number"
        autoCompleteType="tel"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        autoCompleteType="street-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        autoCompleteType="password"
        secureTextEntry
      />
      <Button
        title="Create Account"
        onPress={handleSubmit}
        style={styles.button }
      />

      
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
    backgroundColor: '#F0F8FF',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: "#F0F8FF",
  },
  button: {
    marginTop: 20,
    width: "50%",
  },
});

export default SignupForm;
