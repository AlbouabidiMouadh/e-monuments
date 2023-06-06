import React, {useState, useEffect, useRef} from 'react';
import MapView, {Callout, Marker, Polyline} from 'react-native-maps';
import {StyleSheet, Text, View} from 'react-native';
import RoundWhiteButton from './FinLocation';
import {
  animateToRegion,
  getLocation,
  moveToUserLocation,
} from './MaplocationController';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

export default function UserMap() {
  const [initialRegion, setInitialRegion] = useState(null);
  const [guides, setGuides] = useState([]);
  const fetchGuides = async () => {
    const response = await axios.get(`http://${url}/guides-coord`);
    try {
      const data = response.data;
      console.log(data);
      setGuides(data);
      console.log(guides);
    } catch (error) {
      console.log(error);
    }
  };

  const mapView = useRef(null);

  const [userLocation, setUserLocation] = useState();
  const [pin, setPin] = useState({
    latitude: 35.75928,
    longitude: 10.812208,
  });
  const [pin1, setPin1] = useState({
    latitude: 35.66,
    longitude: 10.812208,
  });
  const [origin, setOrigin] = useState({
    latitude: 35.75928,
    longitude: 10.812208,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09,
  });

  useEffect(() => {
    // Geolocation.getCurrentPosition(
    //   position => {
    //     const { latitude, longitude } = position.coords;
    //     setInitialRegion({
    //       latitude,
    //       longitude,
    //       latitudeDelta: 0.0922,
    //       longitudeDelta: 0.0421,
    //     });
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
    fetchGuides();
  }, []);

  /*   useEffect(() => {
    setTimeout(() => {
      animateToRegion(mapView, userLocation);
    }, 1000);
  }, [userLocation]); */

  return (
    <View>
      {/* 
      <RoundWhiteButton
        onPress={() => moveToUserLocation(mapView, userLocation)}
        image={require('../../assets/mapCenter.png')}
        disabled={false}
      /> */}
      <MapView
        ref={mapView}
        style={styles.map}
        // initialRegion={{
        //   latitude: 36.81785,
        //   longitude: 10.18445,
        //   longitudeDelta: 0.04,
        //   latitudeDelta: 0.09,
        // }}
        initialRegion={{
          latitude: 33.8869,
          longitude: 9.5375,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
        minZoomLevel={10}
        maxZoomLevel={20}
        showsUserLocation={userLocation ? true : false}>
        {/* {guides.map(item => {
          return (
            <Marker
              coordinate={{
                latitude: parseFloat(item.latitude),
                longitude: parseFloat(item.longitude),
              }}
              // draggable={true}
              // onDragStart={(e) => {
              //   console.log(e.nativeEvent.coordinate);
              // }}
              // onDragEnd={(e) => {
              //   setPin({
              //     latitude: e.nativeEvent.coordinate.latitude,
              //     longitude: e.nativeEvent.coordinate.longitude,
              //   });
              // }}
            >
              <Callout>
                <Text>{item.title}</Text>
              </Callout>
            </Marker>
          );
        })} */}
        {/* <Marker
          coordinate={pin1}
          draggable={true}
          onDragStart={(e) => {
            console.log(e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            setPin1({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        >
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>
        <Polyline
          coordinates={[pin1, pin]}
          strokeColor="red"
          strokeWidth={6}
        /> */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    zIndex: -1,
    // marginTop: 50,
  },
});
