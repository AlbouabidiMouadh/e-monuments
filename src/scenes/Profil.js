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
    console.log('')
    const userDataInfo = await axios.get(`http://${url}/user-profile/${userId}`);
    try {
      console.log('request get user data success');
      const userD = userDataInfo.data;
      setUserData(userD.user);
      setUserPosts(userD.filtredPosts);
      console.log(userData);
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
      console.log(username);
    };
    const fetchData = async () => {
      await fetchUserData();
      console.log('user data fetched');
    };
    fetchInfo();
    fetchData();

  }, [userId]);
  const ProfileBody = ({userData}) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
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
              }}>
              {/* {'accountName'} */}
              {userName}
            </Text>
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
              style={{width: '30%', marginLeft: '44%', marginTop: '2%'}}>
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
          <View style={{alignItems: "center"}}>
            <Text>{userData.bio+"   "}</Text>
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
                user: userData
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
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
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
              Create Post
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
              Create Sponsorship
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <View>
          <Text>Posts</Text>
        </View>
        <View
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
                <Text>{item.title}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Profil;
