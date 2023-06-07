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
  const [guides, setGuides] = useState();
  const fetchSponsorships = () => {
    axios.get(`http://${url}/all-sponsorships`).then(result => {
      const data = result.data;
      console.log('--------------------------------------------------------');
      console.log(data);
      // data = data.filter(item => {
      //   return true; // make here the way to filter the sponsorships
      // });
      setSponsorships(data);
    });
  };
  const fetchGuides = () => {
    axios
      .get(`http://${url}/all-guide-states`)
      .then(result => {
        const user = AsyncStorage.getItem('user');
        if (typeof user) {
          const listGuides = result.data.slice(0, 23);
          console.log(
            '--------------------------------------------------------',
          );
          console.log(listGuides);
          setGuides(listGuides);
        } else {
          const listGuides = result.data.slice(0, 7);
          setGuides(listGuides);
          console.log(listGuides);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    func();
    fetchGuides();
    fetchSponsorships();
  }, []);
  return (
    <View
      style={{
        height: Dimensions.get('screen').height,
      }}>
      <FlatList
        horizontal
        pagingEnabled={true}
        scrollEnabled={true}
        style={{height: '120%'}}
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
                  uri: `http://${url}/pictures/GuidesStates/${item.image}.jpg`,
                }}
              />
              <Text style={postStyles.vPostTitle}>{item.title}</Text>
              <Text style={postStyles.vPostDescription}>
                {item.description.substr(0, 200) + '...'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  console.log(item);
                  if (isLogged)
                    navigation.navigate('Guide', {
                      state: item.location,
                      stateInfo: item,
                    });
                  else alert('you need to sign in to see this content');
                }}>
                <Text style={{color: 'black'}}>Plus </Text>
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
            <View style={{alignItems: 'center', minHeight: 100, color: 'black'}}>
              <Image
                style={{resizeMode: 'cover', height: 200, width: 300}}
                source={{
                  uri: `http://${url}/pictures/GuidesStates/sponsorship/${String(
                    item.image,
                  )}.jpg`,
                }}
              />
              <Text style={{fontSize: 20, color: 'black'}}>{item.title}</Text>
              {/* <Text>{item.description}</Text> */}
              <Text style={{fontSize: 15, color: 'black'}}>
                {String(item.location)}
              </Text>
              <TouchableOpacity
                style={{marginBottom: 10}}
                onPress={() => {
                  if (isLogged)
                    navigation.navigate('Sponsorship', {spons: item});
                  else alert('you need to sign in to see this content');
                }}>
                <Text style={{color: 'black'}}>Plus </Text>
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
    height: 250,
    alignItems: 'center',
    // textAlign: "center"
  },
  vPostImage: {
    resizeMode: 'cover',
    height: 300,
    width: Dimensions.get('screen').width,
  },
  vPostTitle: {
    color: 'black',
    fontSize: 30,
  },
  vPostDescription: {
    color: 'black',
  },
});

export default Guides;
