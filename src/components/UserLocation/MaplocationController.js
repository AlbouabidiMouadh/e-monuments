import MapView from 'react-native-maps';
import { Platform } from 'react-native';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

export const animateToRegion = async (
  mapRef,
  userLocation,
) => {
  if (mapRef !== undefined && mapRef.current !== null) {
    if (userLocation !== undefined) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 4,
          longitudeDelta: 4,
        },
        1000,
      );
    }
  }
};

export const moveToUserLocation = (
  mapRef,
  userLocation,
) => {
  if (
    mapRef !== undefined &&
    mapRef.current !== null &&
    userLocation !== undefined
  ) {
    console.log('haha');
    mapRef.current.animateToRegion(
      {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0915,
        longitudeDelta: 0.09121,
      },
      1000,
    );
  }
};
export const checkLocationPermissionStatus = (
  setUserLocation,
  setPermissionStatus,
) => {
  check(
    Platform.OS == 'android'
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  )
    .then(result => {
      setPermissionStatus(result);
      switch (result) {
        case RESULTS.LIMITED:
          getLocation(setUserLocation);
          break;
        case RESULTS.GRANTED:
          getLocation(setUserLocation);
          break;
      }
    })
    .catch(error => {});
};

export const getLocation = (
  setUserLocation,
) => {
  Geolocation.getCurrentPosition(
    position => {
      setUserLocation(position.coords);
    },
    () => {
      setUserLocation(undefined);
    },
    { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 },
  );
};
