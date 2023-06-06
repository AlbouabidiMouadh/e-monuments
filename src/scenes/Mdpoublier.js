import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Login from './Login';
import Btn from '../components/Btn';
import Field from '../components/Field';
import url from '../config/url';
import axios from 'axios';
const Mdpoublier = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const handleResetPassword = async () => {
    const response = await axios.post(`http://${url}/password-recover`, {
      email: email,
      type: 'user',
    });
    try {
      if (response.data.sent == true) {
        console.log('request done');
        console.log(response.data);
        Alert.alert('votre nouvelle mot de passe est envoyer a votre email !');
        navigation.navigate('Splash');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '50%',
        backgroundColor: '#B4D9F3',
      }}>
      <View
        style={{
          justifyContent: 'center',
          paddingVertical: 10,
          marginVertical: 20,
        }}>
        <Text style={{fontSize: 30, color: '#006BBB', fontWeight: 'bold'}}>
          Mot de passe oublier ?
        </Text>
      </View>
      <Field
        placeholder="Email /Num de téléphone"
        keyboardType={'email-address'}
        onChangeText={newText => setEmail(newText)}
        style={{
          borderRadius: 100,
          color: '#CA955C',
          paddingHorizontal: 10,
          width: '78%',
          backgroundColor: '#F0F0F0',
          marginVertical: 10,
        }}
      />
      <Btn
        textColor="white"
        bgColor={'#ED8C56'}
        btnLabel="Réinitialiser le mot de passe"
        Press={() => {
          handleResetPassword();
        }}
        // onPress={() => {
        //   handleResetPassword();
        // }}
      />
    </View>
  );
};

export default Mdpoublier;
