import MapView from 'react-native-maps';
import {IMapCoords} from './Types';
import {Platform} from 'react-native';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

export const animateToRegion = async (
  mapRef: React.RefObject<MapView>,
  userLocation?: IMapCoords | undefined,
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
  mapRef?: React.RefObject<MapView>,
  userLocation?: IMapCoords,
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
  setUserLocation: (value: IMapCoords | undefined) => void,
  setPermissionStatus: (str: string) => void,
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
  setUserLocation: (value: IMapCoords | undefined) => void,
) => {
  Geolocation.getCurrentPosition(
    position => {
      setUserLocation(position.coords);
    },
    () => {
      setUserLocation(undefined);
    },
    {enableHighAccuracy: false, timeout: 5000, maximumAge: 10000},
  );
};
