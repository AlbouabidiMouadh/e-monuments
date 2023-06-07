import React, {useEffect, useState} from 'react';
import axios from 'axios';
import uuid from 'react-native-uuid';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

const CreateSponsorShips = () => {
  const getUserId = async () => {
    const user = await AsyncStorage.getItem('user');
    const id = await AsyncStorage.getItem('id');
    console.log('user = ', user);
    console.log('id = ', id);
    setUserName(user);
    setUserID(id);
  };
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState(null);
  getUserId();
  const navigation = useNavigation();
  const [location, setLocation] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pictureName, setPictureName] = useState(uuid.v4());
  const [user, setUser] = useState('');
  const [filePath, setFilePath] = useState({});
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log(response.assets[0].uri);
      setFilePath(response.assets[0].uri);
      const name = response.assets[0].uri;
      setPicName(name);
      setPictureName(uuid.v4());
    });
  };
  const create = async () => {
    try {
      const formData = new FormData();
      formData.append('profile', {
        name: pictureName,
        uri: filePath,
        type: 'image/jpg',
      });
      const pic = await axios.post(`http://${url}/upload-picture`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('request create sponsorship made');
      console.log(pic);
    } catch (error) {
      console.log(error);
    }
    try {
      const result = await axios.post(
        `http://${url}/create-sponsorship`,
        {
          title: title,
          description: description,
          image: pictureName,
          location: location,
          createdById: id,
          createdByName: userName
        },
        {headers: {'Content-Type': 'application/json'}},
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  const [picName, setPicName] = useState('aucune image sélectionnée pour le moment');
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>Creer Sponsorship</Text>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}>Choisir Image</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="title"
          onChangeText={newText => setTitle(newText)}
          style={{}}></TextInput>
        <TextInput
          placeholder="description"
          onChangeText={newText => setDescription(newText)}
          style={{}}></TextInput>
        <TextInput
          placeholder="location"
          onChangeText={newText => setLocation(newText)}
          style={{}}></TextInput>
          {filePath && <Text>{picName}</Text>}
        {/* {filePath && <Image source={filePath} />} */}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={async () => {
            await create();
            navigation.navigate('FakePayementPage');
          }}>
          <Text style={styles.textStyle}>Payer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 100,
  },
  titleText: {
    margin: 30,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    // margin: 30,
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
    margin: 30,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});

export default CreateSponsorShips;
