import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import url from '../config/url';


const Guides = () => {
  const navigation = useNavigation();
  const [isLogged, setIsLogged] = useState(false);
  const func = async () => {
    try {
      const d = await AsyncStorage.getItem('AccessToken');
      const u = await AsyncStorage.getItem('user');
      console.log(u);
      console.log(d);

      setIsLogged(d);
    } catch (err) {
      console.log(err);
    }
  };
  const [guides, setGuides] = useState();
  useEffect(() => {
    func();
    fetchGuides();
  }, []);
  const fetchGuides = () => {
    axios
      .get(`http://${url}/all-guides`)
      .then(result => {
        const user = AsyncStorage.getItem('user');
        if (user.email != undefined) {
          const listGuides = result.data;
          setGuides(listGuides);
        } else {
          const listGuides = result.data.slice(0, 10);
          setGuides(listGuides);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled={true}
        scrollEnabled={true}
        style={{height: '80%'}}
        data={guides}
        keyExtractor={guide => guide._id}
        ListEmptyComponent={() => <Text>pas de publication</Text>}
        renderItem={({item}) => {
          return (
            <View style={postStyles.vPostContainer}>
              <Image
                style={postStyles.vPostImage}
                source={{
                  uri: `http://${url}/pictures/${String(
                    item.image,
                  )}.jpg`,
                }}
              />
              <Text style={postStyles.vPostTitle}>{item.title}</Text>
              <Text style={postStyles.vPostDescription}>
                {item.description}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (isLogged) navigation.navigate('Post', {post: item});
                  else alert('you need to sign in to see this content');
                }}>
                <Text>ReadMore</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
     

      {/* sponsorships */}

      <FlatList />

      {/* 
        - profil : sponsorships / modifier profil / posts
        - jaime posts / guides 
        - guides : categories
      */}
    </View>
  );
};

const postStyles = StyleSheet.create({
  vPostContainer: {
    width: Dimensions.get('screen').width,
    height: 300,
    // textAlign: "center"
  },
  vPostImage: {
    resizeMode: 'cover',
    height: 350,
    width: Dimensions.get('screen').width,
  },
  vPostTitle: {
    fontSize: 30,
  },
  vPostDescription: {},
});

export default Guides;
