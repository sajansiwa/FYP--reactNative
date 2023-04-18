import React from "react";
import {
  View,
  Text,
  Button,
  Linking,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import { StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";

import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import axios from "axios";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { BASE_URL } from "../../constants/AppConstant";
import { useSelector } from "react-redux";

const API_KEY = "AIzaSyDh-hd8fgRHqk9ll9faCCuGA5vjka_XVCU";
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.75;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const HomeScreen = ({ navigation }) => {
  const [mapRegion, setMapRegion] = useState(null);
  const [nearestHospital, setNearestHospital] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [clicked, setclick] = useState(true);
  const [url, seturl] = useState();
  const reference = useRef(null);
  let { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.003;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [loading, setLoading] = useState(false);

  const [hospitals, setHospitals] = useState([]);
  let mapAnimation = new Animated.Value(0);
  let mapIndex = 0;

  const user = useSelector((state) => state.auth);

  async function checkIn(data) {
    console.log(
      `i am user ${user.user.email_id} and hosp email is ${data.email_id}`
    );
    try {
      const response = await axios.post(`${BASE_URL}visitedHosp`, {
        hosp_email: data.email_id,
        patient_email: user.user.email_id,
      });
    } catch (error) {
      console.log(`i am checkedin error ${error}`);
    }
  }
  async function getHospitals() {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}get-all-hospital`);

      setHospitals(response.data.hosps);
      // console.log("---------------------------------",response.data.hosps);
      setLoading(false);
    } catch (error) {
      console.log(`hy i am error ${error}`);
      setLoading(false);
    }
  }

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

    getHospitals();
  

    return () => watchLocation.remove();
  }, []);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= hospitals.length) {
        index = hospitals.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          // const { coordinate } = hospitals[index];
          const coordinate = {
            latitude: hospitals[index].latitude,
            longitude: hospitals[index].longitude,
          };
          reference.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: mapRegion.latitudeDelta,
              longitudeDelta: mapRegion.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const _scrollView = React.useRef(null);

  const getNearestHospital = async () => {
    try {
      const { latitude, longitude } = mapRegion;
      console.log("latitude1", latitude);
      console.log("longitude1", longitude);

      const response = await axios.post(`${BASE_URL}get-nearest`, {
        latitude: latitude,
        longitude: longitude,
      });
      const nearestHospital = response.data;

      setNearestHospital(nearestHospital);

      const destination = `${nearestHospital.name}`;

      const url = `https://www.google.com/maps/dir/?api=1&destination=${nearestHospital.name}&travelmode=driving`;
      console.log(url)
      seturl(url);
      const res = await axios.get(url);
      return (directions = res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const googlemap = (name) => {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${name}&travelmode=driving`;
    Linking.openURL(url)
  }

  return (
    <View style={styles.container}>
      {mapRegion ? (
        <MapView style={styles.map} region={mapRegion} ref={reference}>
          <Marker coordinate={mapRegion}>
            <Image
              source={require("../../assets/my-location.png")}
              style={styles.marker}
              resizeMode="contain"
            />
          </Marker>
          {hospitals.map((data, index) => {
            return (
              <Marker
                key={data.email_id}
                coordinate={{
                  latitude: data.latitude,
                  longitude: data.longitude,
                }}
              >
                <Image
                  source={require("../../assets/hops-location.png")}
                  style={[styles.marker]}
                  resizeMode="contain"
                />
              </Marker>
            );
          })}
        </MapView>
      ) : (
        <View></View>
      )}

      {
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          pagingEnabled
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          ref={_scrollView}
        >
          {hospitals.map((data, index) => (
            <View style={styles.card} key={index}>
              <Image
                source={require("../../assets/logo.jpeg")}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>
                  {data.name}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {data.address} || {data.phone_number}
                </Text>
                <View style={styles.button}>
                  <Button
                    title="Emergency CheckIn"
                    onPress={() => checkIn(data) && googlemap(data.name)}
                  />
                </View>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    color: "#FFF",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    color: "red",
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  container: {
    flex: 1,
  },
  marker: {
    width: 60,
    height: 60,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    // alignSelf: "center",
    // backgroundColor: "#fff",
    // borderRadius: 8,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  button: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 16,
    display: "flex",
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  cardContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "white",
    // Add any other styles for your card component here
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: "gray",
    marginBottom: 16,
  },
  cardItem: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default HomeScreen;
