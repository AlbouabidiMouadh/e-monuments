import React from 'react';
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native';
const Sponsorship = ({route}) => {
  const {spons} = route.params;

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{
              // uri: `http://${url}/pictures/GuidesStates/sponsorship/cafe-souk.jpg`,

              uri: `http://${url}/pictures/GuidesStates/sponsorship/${String(
                spons.image,
              )}.jpg`,
            }}
          />
          <Text style={styles.title}>{spons.title}</Text>
          <Text style={styles.description}>{spons.description}</Text>
          <Text style={styles.description}>localisation: {spons.location}</Text>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: 80,
    marginBottom: 30,
    resizeMode: 'cover',
    height: 300,
    width: 300,
  },
  title: {
    fontSize: 40,
    textAlign: "center"
  },
  description: {
    fontSize: 20,
    textAlign: "center"

  },
  comments: {},
});
export default Sponsorship;
