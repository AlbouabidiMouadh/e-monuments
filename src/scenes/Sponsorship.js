import React from 'react';
import {View, Image, Text, StyleSheet} from "react-native"
const Sponsorship = ({route}) => {
  const {spons} = route.params;

  return (
    <View style={styles.container}>
      <Image
       style={styles.image}
        source={{
          uri: `http://${url}/pictures/GuidesStates/Bizzert.jpg`,

          // uri: `http://${url}/pictures/${String(spons.image)}.jpg`,
        }}
      />
      <Text style={styles.title}>{spons.title}</Text>
      <Text style={styles.description}>{spons.description}</Text>
      <Text style={styles.description}>{spons.location}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: 100,
    marginBottom: 50,
    resizeMode: 'cover',
    height: 300,
    width: 300,
  },
  title: {
    fontSize: 40,
  },
  description: {
    fontSize: 20,
  },
  comments: {},
});
export default Sponsorship;
