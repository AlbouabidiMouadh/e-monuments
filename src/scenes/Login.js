import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Btn from '../components/Btn';
import Field from '../components/Field';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../config/url';

const styles = StyleSheet.create({
  input: {
    borderRadius: 100,
    color: '#CA955C',
    paddingHorizontal: 10,
    width: '78%',
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
  },
});
const Login = props => {
  const navigation = useNavigation();
  const forgetPasswordHandler = () => {
    navigation.navigate('mdpOublier');
  };
  const LoginAPI = async () => {
    console.log('starting the request');

    const response = await axios.post(
      `http://${url}/login/`,
      {
        email: email,
        password: password,
      },
      {headers: {'Content-Type': 'application/json'}},
    );
    try {
      const result = response.data;
      console.log('done');
      console.log(result);
      const {errorType, connected, token, user} = result;
      if (connected == true) {
        await AsyncStorage.setItem('AccessToken', JSON.stringify(token));
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('id', JSON.stringify(user));
        navigation.navigate('Tabs');
      } else {
        setErrorMessage(errorType);
        console.log(errorMessage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [email, setemail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '50%',
        backgroundColor: '#DBC593',
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 55,
          fontWeight: 'bold',
          marginVertical: 20,
          marginTop: 80,
        }}>
        Se connecter
      </Text>
      <View
        style={{
          backgroundColor: 'white',
          height: '90%',
          width: '100%',
          borderTopLeftRadius: 130,
          paddingTop: 100,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 40, color: '#495784', fontWeight: 'bold'}}>
          Bienvenu
        </Text>
        <Field
          placeholder="Email /Num de téléphone"
          keyboardType={'email-address'}
          onChangeText={newText => setemail(newText)}
          style={styles.input}
        />
        <Field
          placeholder="Mot de passe"
          style={styles.input}
          onChangeText={newText => setPassword(newText)}
          secureTextEntry={true}
        />
        <View
          style={{
            alignItems: 'flex-end',
            width: '78%',
            paddingRight: 16,
            marginBottom: 200,
          }}>
          <TouchableOpacity
            onPress={() => {
              forgetPasswordHandler();
            }}>
            <Text style={{color: '#85A4BA', fontWeight: 'bold', fontSize: 14}}>
              Mot de passe oublier?
            </Text>
          </TouchableOpacity>
        </View>
        <Text>{errorMessage}</Text>

        <Btn
          textColor="white"
          bgColor={'#495784'}
          btnLabel="Connexion"
          Press={() => {
            LoginAPI();
          }}
        />

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 12}}>Vous n\'avez pas un compte ? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
            <Text style={{color: '#85A4BA', fontWeight: 'bold', fontSize: 14}}>
              Creer un compte{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
