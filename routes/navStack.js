import React from "react";
import { TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerNavigator } from "./drawerStack";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import LoginForm from "../apps/screens/signInScreen";
import SignupForm from "../apps/screens/signUpScreen";
import HomeScreen from "../apps/screens/home";
import MenuIcon from "../apps/screens/button";


const Stack = createStackNavigator();

export const MainStackNavigator = ({ navigation }) => {
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
  //         <View style={{ marginLeft: 10 }}>
  //           <Ionicons name="md-menu" size={24} color="black" />
  //         </View>
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#009387" },
        headerTintColor: "#fff",
        headerRight: MenuIcon,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        options={{ title: "Login" }}
        component={LoginForm}
      />
      <Stack.Screen
        name="SignupForm"
        options={{ title: "Signup" }}
        component={SignupForm}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};
