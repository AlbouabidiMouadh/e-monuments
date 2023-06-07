import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
// import {ProfileBody, ProfileButtons} from '../components/ProfileBody';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import url from '../config/url';
import axios from 'axios';
const Profil = () => {
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const fetchUserData = async () => {
    console.log('request get user data started');
    console.log('');
    const userDataInfo = await axios.get(
      `http://${url}/user-profile/${String(userId)}`,
    );
    try {
      console.log('request get user data success');
      const userD = userDataInfo.data;
      setUserData(userD.user);
      setUserPosts(userD.filtredPosts);
      console.log(userData);
      console.log(userPosts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchInfo = async () => {
      const userID = await AsyncStorage.getItem('id');
      const username = await AsyncStorage.getItem('user');
      setUserId(JSON.parse(userID));
      setUserName(JSON.parse(username));
      console.log(userID);
      console.log("username" +username);
    };
    const fetchData = async () => {
      await fetchUserData();
      console.log('user data fetched');
    };
    fetchInfo();
    fetchData();
    console.log(userData)
  }, [userId]);
  const ProfileBody = ({userData}) => {
    return (
      <View>
        <View
          style={{
            // flexDirection: 'row',
            // alignItems: 'center',
            // justifyContent: 'space-between',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // marginBottom: '5px',
            // marginTop: '5%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'black',
                width: '40%',
              }}>
              {/* {'accountName'} */}
              {String(userName)}
            </Text>
            <View></View>
            <TouchableOpacity
              onPress={async () => {
                try {
                  const token = await AsyncStorage.getItem('AccessToken');
                  console.log(token);
                  AsyncStorage.removeItem('AccessToken');
                  AsyncStorage.removeItem('user');
                  AsyncStorage.removeItem('id');
                  token = await AsyncStorage.getItem('AccessToken');
                  console.log(AsyncStorage.getItem('AccessToken'));
                } catch (err) {
                  console.log(err);
                }
                navigation.navigate('Splash'); // Replace `navigator` with `navigation`
              }}
              style={{width: '30%', marginLeft: '30%'}}>
              <View
                style={{
                  width: '100%',
                  height: 35,
                  borderRadius: 50,
                  borderColor: '#DEDEDE',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                    letterSpacing: 1,
                    opacity: 0.8,
                    color: 'red',
                  }}>
                  Log Out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingVertical: 20,
          }}>
          <View>
            <View
              style={{
                backgroundColor: 'black',
                borderRadius: 80,
                width: 87,
                height: 87,
                borderRadius: 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/images/profilll.png')}
                style={{
                  resizeMode: 'cover',
                  width: 80,
                  height: 80,
                  borderRadius: 90,
                }}
              />
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text>{String(userData.bio) + '   '}</Text>
        </View>
      </View>
    );
  };

  const ProfileButtons = () => {
    const navigation = useNavigation();
    return (
      <>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingVertical: 5,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.push('EditProfile', {
                // profileImage: userData.profileImage,
                user: userData,
              })
            }
            style={{
              width: '100%',
            }}>
            <View
              style={{
                width: '100%',
                height: 35,
                borderRadius: 50, // Remove duplicate borderRadius property here
                borderColor: '#DEDEDE',
                borderWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  letterSpacing: 1,
                  opacity: 0.8,
                  color: 'black',
                }}>
                Modifier profil
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  navigator = useNavigation();
  const DeletePostHandler = async id => {
    try {
      const response = axios.delete(`http://${url}/post/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const ModifyPostHandler = id => {
    navigator.navigate('ModifyPost', {id: id});
  };
  return (
    <View style={{width: '100%', backgroundColor: 'white'}}>
      <View style={{width: '100%', padding: 10}}>
        <ProfileBody userData={userData} />

        <ProfileButtons />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigator.navigate('Plus');
          }}
          style={{width: '45%'}}>
          <View
            style={{
              width: '100%',
              height: 35,
              borderRadius: 50,
              borderColor: '#DEDEDE',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                letterSpacing: 1,
                opacity: 0.8,
                color: 'black',
              }}>
              creer un poste
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigator.navigate('CreateSponsorship');
          }}
          style={{width: '45%'}}>
          <View
            style={{
              width: '100%',
              height: 35,
              borderRadius: 50,
              borderColor: '#DEDEDE',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                letterSpacing: 1,
                opacity: 0.8,
                color: 'black',
              }}>
              faire un Sponsorship
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <View>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20,
              textAlign: 'center',
              margin: 20,
            }}>
            Posts
          </Text>
        </View>
        <ScrollView
          style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
          {userPosts.map(item => {
            return (
              <View style={{width: Dimensions.get('screen').width / 2 - 20}}>
                <Image
                  alt={item.description}
                  source={{
                    uri: `http://${url}/pictures/${String(item.image)}.jpg`,
                  }}
                  width={200}
                  height={200}
                />
                <Text
                  style={{color: 'black', fontSize: 18, textAlign: 'center'}}>
                  {item.title}
                </Text>
                <TouchableOpacity onPress={ModifyPostHandler(item._id)}>
                  <Text>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={DeletePostHandler(item._id)}>
                  <Text>supprimer</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Profil;
