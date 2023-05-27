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
  const [userPosts, setUserPosts] = useState([]);
  const getUserId = async () => {
    const userID = await AsyncStorage.getItem('user');
    setUserId(userID);
  };
  const fetchUserData = async () => {
    const user = await axios.get(`http://${url}/user/${userId}`);
    try {
      const userD = user.data;
      setUserData(userD);
      console.log(userData);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUserPosts = async () => {
    const data = await axios.get(`http://${url}/posts/${userId}`);
    try {
      const posts = data.data;
      setUserPosts(posts);
      console.log(userPosts);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await getUserId();
      console.log('user id gotten');
      await fetchUserData();
      console.log('user data fetched');
      await fetchUserPosts();
      console.log('user posts fetched');
    };
    fetchData();
  }, []);
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
              {userData.firstName + ' ' + userData.lastName}
            </Text>
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
                source={{
                  uri: `http://${url}/pictures/${String(userData.image)}.jpg`,
                }}
                style={{
                  resizeMode: 'cover',
                  width: 80,
                  height: 80,
                  borderRadius: 90,
                }}
              />
            </View>
            <Text
              style={{
                paddingVertical: 5,
                fontWeight: 'bold',
                color: 'black',
              }}>
              {userData.firstName}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
              {userData.post}
            </Text>
            <Text>Publications</Text>
          </View>
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
                profileImage: userData.image,
              })
            }
            style={{
              width: '100%',
            }}>
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
          flexDirection: 'column',
          alignItems: 'baseline',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigator.navigate('Plus');
          }}>
          <Text>create post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            try {
              const token = await AsyncStorage.getItem('AccessToken');
              console.log(token);
              AsyncStorage.removeItem('AccessToken');
              AsyncStorage.removeItem('user');
              token = await AsyncStorage.getItem('AccessToken');
              console.log(AsyncStorage.getItem('AccessToken'));
            } catch (err) {
              console.log(err);
            }
            navigator.navigate('Splash');
          }}>
          <Text>Log out</Text>
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
                  source={{
                    uri: `http://${url}/pictures/${String(item.image)}.jpg`,
                  }}
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
