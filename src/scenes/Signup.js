import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {darkGreen} from '../assets/utils/Const';
import Field from '../components/Field';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import url from "../config/url";

const Signup = props => {
  const navigation = useNavigation();
  const SignupAPI = () => {
    console.log('starting the request');
    axios
      .post(
        `http://${url}/signup/`,
        {
          firstname: fname,
          lastname: lname,
          email: email,
          password: pass,
          passwordConfirmation: passConf,
          location: location,
          date: date,
        },
        {headers: {'Content-Type': 'application/json'}},
      )
      .then(response => {
        const result = response.data;
        console.log('done');
        console.log(result);
        const {errorfield, errorType, connected} = result;
        if (connected == true) {
          navigation.navigate('Login');
        } else {
          setErrorMessage(errorType);
          setErrorField(errorfield);
          console.log('message type' + result.errorType);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const [fname, setFirstname] = useState('');
  const [lname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpassword] = useState('');
  const [passConf, setpasswordConfirm] = useState('');
  const [date, setdate] = useState('');
  const [location, setlocation] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [errorField, setErrorField] = useState();

  const error = field => {
    if (errorField == field) return errorMessage;
  };
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          width: '100%',
        backgroundColor: '#DBC593',
        }}
          >
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Enregistrer
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Créer un nouveau compte
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: '150%',
            width: '100%',
            borderTopLeftRadius: 130,
            paddingTop: 30,
            alignItems: 'center',
          }}>
          <Field
            placeholder="Nom"
            style={
              errorField == 'lastname'
                ? {
                    borderColor: 'red',
                    borderWidth: 1,
                    borderRadius: 100,
                    color: '#CA955C',
                    paddingHorizontal: 10,
                    width: '78%',
                    backgroundColor: '#F0F0F0',
                    marginVertical: 10,
                  }
                : {
                    borderRadius: 100,
                    color: '#ED8C56',
                    paddingHorizontal: 10,
                    width: '78%',
                    backgroundColor: '#F0F0F0',
                    marginVertical: 10,
                  }
            }
            onChangeText={newText => setlastname(newText)}
          />
          <Text style={{color: 'red'}}>{error('lastname')}</Text>
          <Field
            placeholder="Prénom"
            onChangeText={newText => setFirstname(newText)}
            style={
              errorField == 'firstname'
                ? {
                    borderColor: 'red',
                    borderWidth: 1,
                    borderRadius: 100,
                    color: '#CA955C',
                    paddingHorizontal: 10,
                    width: '78%',
                    backgroundColor: '#F0F0F0',
                    marginVertical: 10,
                  }
                : {
                    borderRadius: 100,
                    color: '#CA955C',
                    paddingHorizontal: 10,
                    width: '78%',
                    backgroundColor: '#F0F0F0',
                    marginVertical: 10,
                  }
            }
          />
          <Text style={{color: 'red', margin: 0, padding: 0}}>
            {error('firstname')}
          </Text>
          <Field
            placeholder="Email / Num de telephone"
            keyboardType={'email-address'}
            style={
              errorField == 'email'
                ? {
                    borderColor: 'red',
                    borderWidth: 1,
                    borderRadius: 100,
                    color: '#CA955C',
                    paddingHorizontal: 10,
                    width: '78%',
                    backgroundColor: '#F0F0F0',
                    marginVertical: 10,
                  }
                : {
                    borderRadius: 100,
                    color: '#CA955C',
                    paddingHorizontal: 10,
                    width: '78%',
                    backgroundColor: '#F0F0F0',
                    marginVertical: 10,
                  }
            }
            onChangeText={newText => setemail(newText)}
          />
          <Text style={{color: 'red'}}>{error('email')}</Text>
          <Field
            style={
              errorField == 'date'
                ? {
                    borderColor: 'red',
                    borderWidth: 1,
                    borderRadius: 100,
                    color: '#CA955C',
                    paddingHorizontal: 10,
                    width: '78%',
                    backgroundColor: '#F0F0F0',
                    marginVertical: 10,
                  }
                : {
                    borderRadius: 100,
                    color: '#CA955C',
                    paddingHorizontal: 10,
                    width: '78%',
                    backgroundColor: '#F0F0F0',
                    marginVertical: 10,
                  }
            }
            placeholder="Date de naissance"
            onChangeText={newText => setdate(newText)}
            keyboardType={'number'}
          />
          <Text style={{color: 'red'}}>{error('date')}</Text>
          <Field
            placeholder="Payes d'origine"
            style={
              errorField == 'location'
                ? {
                    borderColor: 'red',
                    borderWidth: 1,
                    borderRadius: 100,
                    color: '#CA955C',
                    paddingHorizontal: 10,
                    width: '78%',
                    backgroundColor: '#F0F0F0',
                    marginVertical: 10,
                  }
                : {
                    borderRadius: 100,
                    color: '#CA955C',
                    paddingHorizontal: 10,
                    width: '78%',
                    backgroundColor: '#F0F0F0',
                    marginVertical: 10,
                  }
            }
            onChangeText={newText => setlocation(newText)}
          />
          <Text style={{color: 'red'}}>{error('location')}</Text>
          <Field
            style={
              errorField == 'password'
                ? {
                    borderColor: 'red',
                    borderWidth: 1,
                    borderRadius: 100,
                    color: '#CA955C',
                    paddingHorizontal: 10,
                    width: '78%',
                    backgroundColor: '#F0F0F0',
                    marginVertical: 10,
                  }
                : {
                    borderRadius: 100,
                    color: '#CA955C',
                    paddingHorizontal: 10,
                    width: '78%',
                    backgroundColor: '#F0F0F0',
                    marginVertical: 10,
                  }
            }
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText={newText => setpassword(newText)}
          />
          <Text style={{color: 'red'}}>{error('password')}</Text>
          <Field
            style={
              errorField == 'passwordConfirmation'
                ? {
                    borderColor: 'red',
                    borderWidth: 1,
                    borderRadius: 100,
                    color: '#CA955C',
                    paddingHorizontal: 10,
                    width: '78%',
                    backgroundColor: '#F0F0F0',
                    marginVertical: 10,
                  }
                : {
                    borderRadius: 100,
                    color: '#CA955C',
                    paddingHorizontal: 10,
                    width: '78%',
                    backgroundColor: '#F0F0F0',
                    marginVertical: 10,
                  }
            }
            placeholder="Confirmez le mot de passe"
            secureTextEntry={true}
            onChangeText={newText => setpasswordConfirm(newText)}
          />
          <Text style={{color: 'red'}}>{error('passwordConfirmation')}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              paddingRight: 16,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{color: 'grey', fontSize: 14}}>
              En vous connectant, vous acceptez nos{' '}
            </Text>
            <Text style={{color: '#85A4BA', fontWeight: 'bold', fontSize: 15}}>
              Termes & Conditions
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '78%',
              paddingRight: 16,
              marginBottom: 10,
            }}>
            <Text style={{color: 'grey', fontSize: 14}}>et </Text>
            <Text style={{color: '#85A4BA', fontWeight: 'bold', fontSize: 15}}>
              Politique de Confidentialité
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              SignupAPI();
            }}
            style={{
              backgroundColor: '#ED8C56',
              borderRadius: 100,
              alignItems: 'center',
              width: 350,
              paddingVertical: 5,
              marginVertical: 10,
            }}>
            <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
              {'Connexion'}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Vous avez déjà un compte ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{color: '#85A4BA', fontWeight: 'bold', fontSize: 16}}>
                Se connecter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;
