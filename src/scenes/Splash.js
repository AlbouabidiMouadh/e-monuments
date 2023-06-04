import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import colors from '../assets/utils/colors';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const Splash = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/images/waw.jpg')}
        style={{height: '100%', width: '100%'}}>
        <View style={{flex: 1, marginHorizontal: 30, marginVertical: 35}}>
          <Text
            style={{
              color: 'white',
              fontSize: 50,
              fontWeight: 'bold',
              color: colors.dark,
            }}></Text>
        </View>

        <View style={{flex: 1, justifyContent: 'flex-end', padding: 15}}>
          <View style={{}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Tabs');
              }}
              style={{
                flexDirection: 'row',
                backgroundColor: 'transparent',
                borderColor: '#faebd7',
                padding: 6,
                borderRadius: 40,
                marginBottom: 15,
                justifyContent: 'space-between',
                borderWidth: 3,
              }}>
              <Text
                style={{textAlign: 'center', color: 'white', fontSize: 23}}>
                {' '}
                Commencer
              </Text>
              <Icon name="arrow-forward-outline" color={'#faebd7'} size={40} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}
              style={{
                flexDirection: 'row',
                backgroundColor: 'transparent',
                borderColor: '#faebd7',
                padding: 6,
                borderRadius: 40,
                marginBottom: 15,
                justifyContent: 'space-between',
                borderWidth: 3,
              }}>
              <Text
                style={{textAlign: 'center', color: '#faebd7', fontSize: 23}}>
                {' '}
                Se connecter
              </Text>
              <Icon name="arrow-forward-outline" color={'#faebd7'} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Splash;
