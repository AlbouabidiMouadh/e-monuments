import React, {useState} from 'react';
import {View, TextInput, Button, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import url from '../config/url';
import {useNavigation} from '@react-navigation/native';

const ModifyPostScreen = props => {
  const postId = props.id;
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
  const handleModifier = async () => {
    try {
      const data = {};
      {
        title ? (data = {...data, title}) : null;
      }
      {
        pictureName ? (data = {...data, pictureName}) : null;
      }
      {
        description ? (data = {...data, description}) : null;
      }
      axios.put(`http://${url}/modify-post/${postId}`, data);
    } catch (error) {console.log(error)}
  };
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
          createdById: id,
        },
        {headers: {'Content-Type': 'application/json'}},
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTakePicture = () => {
    captureImage('photo');
  };

  const handleChooseFromGallery = () => {
    chooseFile('photo');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      {image && <Image source={{uri: image}} style={styles.image} />}
      <Button title="Prendre une photo" onPress={handleTakePicture} />
      <Button
        title="Choisir depuis la galerie"
        onPress={handleChooseFromGallery}
      />
      <Button title="Modifier" onPress={handleModifier} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});

export default ModifyPostScreen;
