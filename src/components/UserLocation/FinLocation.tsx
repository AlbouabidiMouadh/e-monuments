import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {IRoundWhiteButtonProps} from './Types';
import {roundWhiteButtonStyle} from './style';

const RoundWhiteButton = (props: IRoundWhiteButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
      <View style={roundWhiteButtonStyle.container}>
        <Image style={roundWhiteButtonStyle.image} source={props.image} />
      </View>
    </TouchableOpacity>
  );
};

export default RoundWhiteButton;
