import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../constants/AppConstant";

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // State for storing phone number

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);

  async function getprofileInfo() {
    try {
      const res = await axios.get(`${BASE_URL}user`, {
        params: {
          email: user.email_id,
        },
      });
      console.log(`res from user is ${res.data}`);
      setName(user.name);
      setAddress(user.address);
      setPhoneNumber(user.number);
    } catch (error) {
      alert(error);
    }
  }

  const updateProfilePic = async () => {
    try {
      var formData = new FormData();
      formData.append("file", image);

      setLoading(true);
      await axios.post(`${BASE_URL}upload-pp/`, formData, {
        params: { id: user.email_id },
      });
      setLoading(false);
      alert("User Profile Updated");
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert(`Error: ${error}`);
    }
  };

  useEffect(() => {
    getprofileInfo();
    console.log(user);
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    setImage(result.assets[0].uri);
    updateProfilePic();
  };

  const handleChangeName = (text) => {
    setName(text);
  };

  const handleAddress = (text) => {
    setAddress(text);
  };

  const handleChangePhoneNumber = (text) => {
    setPhoneNumber(text);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: name,
        address: address,
        phoneNumber: phoneNumber,
        email: user.email_id,
      };
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}updateUser`, payload);
      alert("User Info Updated!");
      getprofileInfo();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(`Error: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image
            source={{
              uri: image,
            }}
            style={styles.avatar}
          />
        ) : (
          <Image
            source={require("../../assets/logo.jpeg")}
            style={styles.avatar}
          />
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={handleChangeName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={handleAddress}
        placeholder="Address"
        keyboardType="default"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={handleChangePhoneNumber}
        placeholder="Phone Number"
        keyboardType="phone-pad"
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
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
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

export default ProfileScreen;
