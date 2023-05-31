import React from 'react';
import {View, Image, Text} from "react-native"
const Sponsorship = ({route}) => {
  const {spons} = route.params;

  return (
    <View>
      <Image
        source={{
          uri: `http://${url}/pictures/${String(spons.image)}.jpg`,
        }}
      />
      <Text>{spons.title}</Text>
      <Text>{spons.description}</Text>
      <Text>{spons.location}</Text>
    </View>
  );
};

export default Sponsorship;
