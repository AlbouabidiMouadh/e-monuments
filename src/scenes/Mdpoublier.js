import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Login from './Login';
import Btn from '../components/Btn';
import Field from '../components/Field';

const Mdpoublier= () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const handleResetPassword = () => {
    // Vérifier et réinitialiser le mot de passe pour l'email donné
    // Implémentez votre logique de réinitialisation de mot de passe ici

    // Exemple basique de validation de l'email
    if (email.trim() === '') {
      Alert.alert('Erreur', 'Veuillez entrer votre adresse e-mail.');
    } else {
      // Envoyer une demande de réinitialisation de mot de passe à l'email spécifié
      // Implémentez votre logique de réinitialisation de mot de passe ici

      Alert.alert('Demande envoyée', 'Un lien de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.');
    }
  };

  return (
    <View style={{
          flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '50%',
        backgroundColor: '#DBC593',
        

    }}>
    
<View style={{ 
 
  justifyContent:'center',
   paddingVertical: 10,
  marginVertical: 20,
}}>
     <Text style={{fontSize: 30, color: '#495784', fontWeight: 'bold', }}>
         Mot de passe oublier ?
        </Text></View>
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
          bgColor={'#495784'}
          btnLabel="Réinitialiser le mot de passe"
          Press={() => {
            LoginAPI();
          }}
        onPress={handleResetPassword}
      />
    </View>
  );
};

export default Mdpoublier;
