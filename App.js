import Store from "./apps/redux/store";
import { Provider, useSelector } from "react-redux";
import { Screen } from "react-native-screens";
// import Navigator from "./routes/navStack";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./routes/navStack";


export default function App() {
 

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <MainStackNavigator/>
      </NavigationContainer>
    </Provider>
  );
}
