import React, {useEffect, useState} from 'react';
import axios from 'axios';
import uuid from 'react-native-uuid';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  ScrollView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import url from '../config/url';

const CreatePost = () => {
  const [ID, setID] = useState();
  const [picName, setPicName] = useState('aucune image sélectionnée pour le moment');
  const getUser = async () => {
    const u = await AsyncStorage.getItem('user');
    const id = await AsyncStorage.getItem('id');
    setUser(JSON.parse(u));
    setID(JSON.parse(id));
    console.log(user);
    console.log('id = ');
    console.log();
    console.log(typeof user);
  };
  useEffect(() => {
    getUser();
  }, []);
  const navigator = useNavigation();
  const [user, setUser] = useState('');
  const [filePath, setFilePath] = useState({});
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

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

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response.assets[0].uri);

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
        // console.log('base64 -> ', response.base64);
        // console.log('uri -> ', response.uri);
        // console.log('width -> ', response.width);
        // console.log('height -> ', response.height);
        // console.log('fileSize -> ', response.fileSize);
        // console.log('type -> ', response.type);
        // console.log('fileName -> ', response.fileName);
        setFilePath(response.assets[0].uri);
        setPictureName(uuid.v4());
      });
    }
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
      // console.log('base64 -> ', response.base64);
      // console.log('uri -> ', response.uri);
      // console.log('width -> ', response.width);
      // console.log('height -> ', response.height);
      // console.log('fileSize -> ', response.fileSize);
      // console.log('type -> ', response.type);
      // console.log('fileName -> ', response.fileName);
      console.log(response.assets[0].uri);
      setFilePath(response.assets[0].uri);
      const name = response.assets[0].uri;
      setPicName(name);
      setPictureName(uuid.v4());
    });
  };
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pictureName, setPictureName] = useState(uuid.v4());
  const createPost = async () => {
    try {
      // const pictureName = String(uuid.v4());

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
          // authorization: `JWT ${token}`,
        },
      });
      console.log('request create post made');
      console.log(pic);
    } catch (error) {
      console.log(error);
    }
    try {
      const result = await axios.post(
        `http://${url}/create-post`,
        {
          title: title,
          description: description,
          image: pictureName,
          createdByName: user,
          createdById: ID,
          
        },
        {headers: {'Content-Type': 'application/json'}},
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>Creer Post</Text>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage('photo')}>
          <Text style={styles.textStyle}>Lancer la caméra</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}
          >Choisissez une image</Text>
        </TouchableOpacity>
        {filePath && <Text>{picName}</Text>}
        {/* {filePath && <Image source={filePath} />} */}
        <TextInput
          placeholder="titre"
          onChangeText={newText => setTitle(newText)}
          style={{}}></TextInput>
        <TextInput
          placeholder="description"
          onChangeText={newText => setDescription(newText)}
          style={{}}></TextInput>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={async () => {
            await createPost();
            navigator.navigate('Tabs');
          }}>
          <Text style={styles.textStyle}>creer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
    
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 350,
    borderRadius: 40,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});
