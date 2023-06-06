import React, {useState, useEffect, useRef} from 'react';
import MapView, {Callout, Marker} from 'react-native-maps';
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

  useEffect(() => {
    fetchGuides();
  }, []);

  // map
  // profile posts
  // traduction francais
  // traduction final

  return (
    <View style={{flex: 1}}>
      {/* <RoundWhiteButton
        onPress={() => moveToUserLocation(mapView, userLocation)}
        image={require('../../assets/mapCenter.png')}
        disabled={false}
      /> */}
      <MapView
        ref={mapView}
        style={styles.map}
        initialRegion={{
          latitude: 33.8869,
          longitude: 9.5375,
          latitudeDelta: 4.5,
          longitudeDelta: 4.5,
        }}
        provider="google"
        showsUserLocation={userLocation ? true : false}>
        {guides.map(item => {
          return (
            <Marker
              key={item._id}
              coordinate={{
                latitude: parseFloat(item.latitude),
                longitude: parseFloat(item.longitude),
              }}>
              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{item.title}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
        {/* <Marker
          coordinate={{
            latitude: 33.8869,
            longitude: 9.5375,
          }}>
          <Callout>
            <View>
              <Text>hello</Text>
            </View>
          </Callout>
        </Marker> */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  calloutContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 10,
  },
  calloutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "black"
  },
});
