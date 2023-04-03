 export default function getCurrentLocation() {
  Geolocation.getCurrentPosition(
    (position) => {
      setLocation(position.coords);
    },
    (error) => {
      console.log(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
    }
  );
}


