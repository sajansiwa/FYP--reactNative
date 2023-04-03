// import React from "react";
// import { View, Text, Button, Linking } from "react-native";
// import { StyleSheet } from "react-native";
// import { useState, useEffect } from "react";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";
// import axios from "axios";

// const HomeScreen = () => {
//   const [mapRegion, setMapRegion] = useState(null);
//   const [nearestHospital, setNearestHospital] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to access location was denied");
//         return;
//       }

//       const location = await Location.getCurrentPositionAsync({
//         enableHighAccuray: true,
//       });

//       setMapRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       });

//     })();
//   }, []);

//   console.log('map region:', mapRegion)

//   const getNearestHospital = async () => {
//     try {
//       const { latitude, longitude } = mapRegion;
//       console.log('latitude1', latitude)
//       console.log("longitude1", longitude);

//       const response = await axios.post(
//         "http://192.168.31.159:4000/api/get-nearest",
//         {
//           latitude: latitude,
//           longitude: longitude,
//         }
//       );

//       const nearestHospital = response.data;
//       console.log(response);

//       console.log('latitude:', nearestHospital.latitude)
//       console.log("longitude:", nearestHospital.longitude);

//       // const url = `https://www.google.com/maps/dir/?api=1&destination=${nearestHospital.latitude},${nearestHospital.longitude}&travelmode=driving`;
//       const url = `https://www.google.com/maps/dir/?api=1&destination=${nearestHospital.name}&travelmode=driving`;
//       Linking.openURL(url);

//       setNearestHospital(nearestHospital);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {mapRegion ? (
//         <MapView style={styles.map} region={mapRegion}>
//           <Marker coordinate={mapRegion} title="Current location" />
//           {nearestHospital ? (
//             <Marker
//               coordinate={{
//                 latitude: nearestHospital.latitude,
//                 longitude: nearestHospital.longitude,
//               }}
//             />
//           ) : null}
//         </MapView>
//       ) : (
//         <Text>Loading...</Text>
//       )}
//       <View style={styles.buttonContainer}>
//         <Button
//           style={styles.button}
//           title="Find Hospital"
//           onPress={() => mapRegion && getNearestHospital()}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: "100%",
//     height: "100%",
//   },
//   buttonContainer: {
//     position: "absolute",
//     bottom: 20,
//     alignSelf: "center",
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     shadowColor: "#000",

//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   button: {

//       color: "#007AFF",
//       fontWeight: "bold",
//       fontSize: 16,
//   },
// });

// export default HomeScreen;

import React from "react";
import { View, Text, Button, Linking, Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";

import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "AIzaSyDh-hd8fgRHqk9ll9faCCuGA5vjka_XVCU";

const HomeScreen = ({navigation}) => {
  const [mapRegion, setMapRegion] = useState(null);
  const [nearestHospital, setNearestHospital] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [clicked, setclick] = useState(true);
  const [url, seturl] = useState();
  const reference = useRef();
  let { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.003;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  useEffect(() => {
    let watchLocation;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      watchLocation = await Location.watchPositionAsync(
        {
          enableHighAccuracy: true,
          timeInterval: 2000,
          distanceInterval: 10,
        },
        (location) => {
          setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          });
          setOrigin({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          });
        }
      );
    })();

    return () => watchLocation.remove();
  }, []);

  console.log("map region:", mapRegion);

  const getNearestHospital = async () => {
    try {
      const { latitude, longitude } = mapRegion;
      console.log("latitude1", latitude);
      console.log("longitude1", longitude);

      const response = await axios.post(
        "http://192.168.31.159:4000/api/get-nearest",
        {
          latitude: latitude,
          longitude: longitude,
        }
      );
      const nearestHospital = response.data;

      setNearestHospital(nearestHospital);

      // const origin = `${mapRegion.latitude},${mapRegion.longitude}`;
      // const destination = `${nearestHospital.latitude},${nearestHospital.longitude}`;
      const destination = `${nearestHospital.name}`;

      const url = `https://www.google.com/maps/dir/?api=1&destination=${nearestHospital.name}&travelmode=driving`;
      // Linking.openURL(url);
      seturl(url)
      const res = await axios.get(url);
      return (directions = res.data);
      
    } catch (error) {
      console.error(error); 
    }
  };

  // const openUrl = (url) => {
  //   Linking.openURL(url);
  // }

  return (
    <View style={styles.container}>
      {mapRegion ? (
        <MapView style={styles.map} region={mapRegion} ref={reference}>
          <Marker coordinate={mapRegion} title="Current location" />
          {nearestHospital ? (
            <>
              <MapViewDirections
                origin={origin}
                destination={{
                  latitude: nearestHospital.latitude,
                  longitude: nearestHospital.longitude,
                }}
                apikey={API_KEY}
                strokeWidth={5}
                strokeColor="green"
                directions={getNearestHospital}
                optimizeWaypoints={true}
                onReady={(result) => {
                  reference.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: 30,
                      bottom: 300,
                      left: 30,
                      top: 100,
                    },
                  });
                }}
              />
              <Marker
                coordinate={{
                  latitude: nearestHospital.latitude,
                  longitude: nearestHospital.longitude,
                }}
                title="Destination"
              />
            </>
          ) : null}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}

      {clicked ? (
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title="Find Hospital"
            onPress={() => mapRegion && getNearestHospital() && setclick(false)}
          />
          {/* <Button
            style={styles.button}
            title="drawer"
            onPress={() => navigation.openDrawer()}
          /> */}
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Navigate" onPress={() => Linking.openURL(url)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeScreen;
