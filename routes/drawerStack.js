// import UserProfile from "../apps/screens/profileScreen";
// import { createDrawerNavigator } from "@react-navigation/drawer";

// const Drawer = createDrawerNavigator();

// export const MainDrawerNavigator = () => {
//   return (
//     <Drawer.Navigator initialRouteName="Home">
//       <Drawer.Screen name="Home" component={UserProfile} />
//       {/* <Drawer.Screen name="Profile" component={ProfileScreen} />
//       <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
//     </Drawer.Navigator>
//   );
// };


import UserProfile from "../apps/screens/profileScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginForm from "../apps/screens/signInScreen";
// import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
    
  return (
    <Drawer.Navigator >
      {/* <Drawer.Screen
        name="Home"
        component={LoginForm}
      /> */}
      <Drawer.Screen name="Profile" component={UserProfile} />
      {/* <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
    </Drawer.Navigator>
  );
};
