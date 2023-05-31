import {
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import Guidedata from './GuidesData';
const Guides = () => {
  // const Guidedata = [{
  //     id: 0,
  //     title: "tunisia",
  //     stateName: "tunisia",
  //     pictureName: require("../assets/images/5.jpg")
  // }]
  const navigation = useNavigation();
  const [sponsorships, setSponsorships] = useState();
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
  const [guides, setGuides] = useState(Guidedata);
  useEffect(() => {
    func();
    fetchGuides();
    fetchSponsorships();
  }, []);
  const fetchSponsorships = () => {
    axios.get(`http://${url}/all-sponsorships`).then(result => {
      const data = result.data;
      // data = data.filter(item => {
      //   return true; // make here the way to filter the sponsorships
      // });
      setSponsorships(data);
    });
  };
  const fetchGuides = () => {
    axios
      .get(`http://${url}/all-guides-states`)
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
        // data={guides}
        keyExtractor={guide => guide._id}
        ListEmptyComponent={() => <Text>pas de publication</Text>}
        renderItem={({item}) => {
          return (
            <View style={postStyles.vPostContainer}>
              <Image
                style={postStyles.vPostImage}
                source={{
                  uri: `http://${url}/public/images/GuidesStates/${item.pictureName}`,
                }}
              />
              <Text style={postStyles.vPostTitle}>{item.stateName}</Text>
              {/* <Text style={postStyles.vPostDescription}>
                {item.description}
              </Text> */}
              <TouchableOpacity
                onPress={() => {
                  if (isLogged)
                    navigation.navigate('Guide', {state: item.stateName});
                  else alert('you need to sign in to see this content');
                }}>
                <Text>ReadMore</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      {/* sponsorships */}

      <FlatList
        pagingEnabled={true}
        scrollEnabled={true}
        // style={{height: '80%'}}
        data={sponsorships}
        keyExtractor={sponsorship => sponsorship._id}
        ListEmptyComponent={() => <Text>pas de sponsoprships</Text>}
        renderItem={({item}) => {
          return (
            <View>
              <Image
                source={{
                  uri: `http://${url}/pictures/${String(item.image)}.jpg`,
                }}
              />
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
              <TouchableOpacity
                onPress={() => {
                  if (isLogged)
                    navigation.navigate('Sponsorship', {spons: item});
                  else alert('you need to sign in to see this content');
                }}>
                <Text>Plus Information</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

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
