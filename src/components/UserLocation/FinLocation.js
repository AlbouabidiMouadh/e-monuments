import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { roundWhiteButtonStyle } from './style';
const RoundWhiteButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
      <View style={roundWhiteButtonStyle.container}>
        <Image style={roundWhiteButtonStyle.image} source={props.image} />
      </View>
    </TouchableOpacity>
  );
};

export default RoundWhiteButton;
