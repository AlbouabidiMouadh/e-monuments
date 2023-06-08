import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  TextInput,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import url from '../config/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import axios from 'axios';
import {useEffect} from 'react';

const EditProfile = ({route, navigation}) => {
  const userD = route.user ;
  const getId = async () => {
    const id = await AsyncStorage.getItem('id');
    setID(JSON.parse(id));
    console.log(id);
  };
  useEffect(() => {
    getId();
  }, []);
  const [pic, setPic] = useState(require("../assets/images/profilll.png"))
  const [ID, setID] = useState(getId);
  const [lastName, setLastName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [email, setEmail] = useState(null);
  const [bio, setBio] = useState(null);
  const [user, setUser] = useState();
  const submitChange = async () => {
    setUser({lastname: lastName, firstName: firstName, email: email, bio: bio});
    // JSON.stringify(user)
    console.log(user);
    const response = await axios.put(`http://${url}/user/${String(ID)}`, {
      lastName: lastName,
      firstName: firstName,
      email: email,
      bio: bio,
      profileImage: pictureName
    });
    updateImage();
    console.log(ID);
    try {
      res = response.data;
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    // axios
    //   .put(`http://${url}/user/${ID}`, user)
    //   .then(() => console.log(result))
    //   .catch(err => {
    //     console.log(err);
    //   });
    TostMessage();
    navigation.goBack();
    setUser({});
    setLastName(null);
    setFirstName(null);
    setEmail(null);
    setBio(null);
  };
  // const {profileImage} = route.params;
  const TostMessage = () => {
    ToastAndroid.show('Edited Sucessfully !', ToastAndroid.SHORT);
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
  const [pictureName, setPictureName] = useState();
  const [filePath, setFilePath] = useState();

  const updateImage = async () => {
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
  };
  const setImage = async () => {
    // let isStoragePermitted = await requestExternalWritePermission();
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    // if (isStoragePermitted) {
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
        setPictureName(ID);
        
      });
    // }
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionic name="close-outline" style={{fontSize: 35}} />
        </TouchableOpacity>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Modifier Profil</Text>
        <TouchableOpacity
          onPress={() => {
            submitChange();
          }}>
          <Ionic name="checkmark" style={{fontSize: 35, color: '#3493D9'}} />
        </TouchableOpacity>
      </View>
      <View style={{padding: 20, alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: 'black',
            borderRadius: 50,
            width: 87,
            height: 87,
            borderRadius: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setImage();
            }}>
            <Image
              source={pic}
              style={{width: 80, height: 80, borderRadius: 100}}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: '#3493D9',
            width: "50%",
            textAlign: "center"
          }}>
          {filePath ? "une image a ete choisit" : "clicker sur l'image pour choisir une photo de profil"}
        </Text>
      </View>
      <View style={{padding: 10}}>
        <View>
          <Text
            style={{
              opacity: 0.5,
              fontWeight: 'bold',
            }}>
            Nom
          </Text>
          <TextInput
            placeholder="Nom"
            // defaultValue={userD.firstName}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
              fontWeight: 'bold',
            }}
            onChangeText={newText => {
              setFirstName(newText);
            }}
          />
        </View>
        <View style={{paddingVertical: 10}}>
          <Text
            style={{
              opacity: 0.5,
              fontWeight: 'bold',
            }}>
            Prenom
          </Text>
          <TextInput
            placeholder="prenom"
            // defaultValue={userD.lastName}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
              fontWeight: 'bold',
            }}
            onChangeText={newText => {
              setLastName(newText);
            }}
          />
        </View>
        <View style={{paddingVertical: 10}}>
          <Text
            style={{
              opacity: 0.5,
              fontWeight: 'bold',
            }}>
            Email
          </Text>
          <TextInput
            placeholder="Email"
            // defaultValue={userD.email}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
              fontWeight: 'bold',
            }}
            onChangeText={newText => {
              setEmail(newText);
            }}
          />
        </View>
        <View style={{paddingVertical: 10}}>
          <Text
            style={{
              opacity: 0.5,
              fontWeight: 'bold',
            }}>
            Bio
          </Text>
          <TextInput
            placeholder="Bio"
            // defaultValue={userD.bio}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
              fontWeight: 'bold',
            }}
            onChangeText={newText => {
              setBio(newText);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default EditProfile;
