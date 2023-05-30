import React from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const LiveCard = () => {
  const navigation = useNavigation();
  const info = {
    title: 'live 1',
    location: 'monastir',
    views: 54,
    image: require('../assets/images/5.jpg'),
  };
  const watchLiveButtonHandler = () => {};
  return (
    <View>
      <Text>{info.title}</Text>
      <Image
        source={info.image}
        style={{
          resizeMode: 'cover',
          height: 250,
          width: Dimensions.get('screen').width,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('LiveStream', {mode: 'viewer'});
        }}>
        <Text>watch the live stream now</Text>
      </TouchableOpacity>
      <Text>{info.location}</Text>
      <Text>{info.views}</Text>
    </View>
  );
};

export default LiveCard;
