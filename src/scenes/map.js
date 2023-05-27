import React, {useEffect, useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';

import axios from 'axios';
// import Mapbox from '@rnmapbox/maps';
// Mapbox.setAccessToken(
  //   'pk.eyJ1IjoiYWxib3VhYmlkaW1vdWFkaCIsImEiOiJjbGhqb3VtZDAwODR4M3FzMXQxeXl0dmFsIn0.uikgjDE93ekk2SUdcqsWvA',
  // );
  // import MapboxGL from '@rnmapbox/maps';
  // MapboxGL.setAccessToken('pk.eyJ1IjoiYWxib3VhYmlkaW1vdWFkaCIsImEiOiJjbGhqb3VtZDAwODR4M3FzMXQxeXl0dmFsIn0.uikgjDE93ekk2SUdcqsWvA',);
import MapLibreGL from '@maplibre/maplibre-react-native';
MapLibreGL.setAccessToken('pk.eyJ1IjoiYWxib3VhYmlkaW1vdWFkaCIsImEiOiJjbGhqb3VtZDAwODR4M3FzMXQxeXl0dmFsIn0.uikgjDE93ekk2SUdcqsWvA');
const Map = () => {
  const defaultStyle = {
    version: 8,
    name: 'Land',
    sources: {
      map: {
        type: 'raster',
        tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        minzoom: 1,
        maxzoom: 19,
      },
    },
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': '#f2efea',
        },
      },
      {
        id: 'map',
        type: 'raster',
        source: 'map',
        paint: {
          'raster-fade-duration': 100,
        },
      },
    ],
  };
  const [guides, setGuides] = useState([]);
  //   const fetchGuides = async () => {
  //     const response = await axios.get('http://192.168.1.12:5000/all-guides');
  //     try {
  //       const data = response.data;
  //       console.log(data);
  //       setGuides(data);
  //       console.log('data fetchec succefully ');
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchGuides();
  //     console.log('finished fetching');
  //   }, []);
  return (
    <SafeAreaView>
      <View>
        {/* <Mapbox.MapView style={styles.map} styleJSON={JSON.stringify(defaultStyle)}>

          </Mapbox.MapView> */}
        {/* <MapboxGL.MapView
          style={styles.map}
          styleJSON={JSON.stringify(defaultStyle)}
        /> */}
        <View style={styles.page}>
        <MapLibreGL.MapView
          style={styles.map}
          logoEnabled={false}
          styleURL="https://demotiles.maplibre.org/style.json"
          styleJSON={JSON.stringify(defaultStyle)}
        />
      </View>
      </View>
    </SafeAreaView>
  );
};
// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     height: 300,
//     width: 300,
//   },
//   map: {
//     flex: 1,
//   },
// });
// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   map: {
//     flex: 1,
//   },
// });
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
export default Map;
