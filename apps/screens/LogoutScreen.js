import React, { useEffect } from "react";
import { Text } from "react-native";

export default function LogoutScreen({ navigation }) {
  useEffect(() => {
    navigation.navigate("Login", { replace: true });
  }, []);

  return <Text>Loggin Out</Text>;
}
