import { createDrawerNavigator } from "@react-navigation/drawer";
import * as React from "react";
import { Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../apps/screens/home";
import AboutScreen from "../apps/screens/AboutScreen";
import ProfileScreen from "../apps/screens/profileScreen";
import ChangePassword from "../apps/screens/ChangePassword";
import LogoutScreen from "../apps/screens/LogoutScreen";
const Drawer = createDrawerNavigator();

export default function HomeStack() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenListeners={(prop) => {
        if (prop.route.name == "About") {
        }
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
      <Drawer.Screen name="Logout" component={LogoutScreen} options={{}} />
    </Drawer.Navigator>
  );
}
