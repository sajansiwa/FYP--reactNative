import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


export default function MenuIcon() {
    const pressHandler = ({navigation}) => {
        navigation.openDrawer
    }
    return (
      <View>
        <MaterialIcons
          style={styles.icon}
          name="menu"
          size={28}
          onPress={pressHandler}
        />
      </View>
    );
}


const styles = StyleSheet.create({
    icon: {
        position: "absolute",
        left: 15,
        color: 'white'
    }
})
