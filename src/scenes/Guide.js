import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const Guide = ({route}) => {
  const {state, stateInfo} = route.params;
  console.log(state, stateInfo);
  const [guides, setGuides] = useState([{}]);
  const fetchGuides = async () => {
    const response = await axios.get(
      `http://${url}/all-guides/${String(state)}`,
    );
    try {
      const data = response.data;
      setGuides(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGuides();
    console.log(guides)
  }, []);
  return (
    <View>
      <ScrollView>

      {/* <View style={{alignItems: 'center', alignContent: 'center'}}>
        <Text style={styles.title}>{stateInfo.title}</Text>
        <Image
          style={styles.image}
          source={{
            uri: `http://${url}/pictures/GuidesStates/${String(
              stateInfo.image,
            )}.jpg`,
          }}
          // source={{
          //   uri: `http://${url}/pictures/GuidesStates/${String(stateInfo.image)}`,
          // }}
          />
          <Text style={styles.description}>{stateInfo.description}</Text>
      </View> */}
      {/* <FlatList
        pagingEnabled={true}
        scrollEnabled={true}
        data={guides}
        // data={guides}
        keyExtractor={guide => guide._id}
        ListEmptyComponent={() => (
          <Text style={{fontWeight: 'bold'}}>
            Les Guides pour cette villes sont en cours de developpement
          </Text>
        )}
        renderItem={({item}) => {
          return (
            <View style={styles.container}>
              {/* <Image
                style={styles.image}
                source={{
                  uri: `http://${url}/pictures/${guide.image}.jpg`,
                }}
              /> 
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.location}</Text> 
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.description}>like: {item.likes}</Text>
            </View>
          );
        }}*/}
      {/* />  */}
      {guides.map((item) => {
        return (
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{
                uri: `http://${url}/pictures/GuidesStates/${String(item.image)}.jpg`,
              }}
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.location}</Text> 
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.description}>like: {item.likes}</Text>
          </View>
        );
      })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: 10,
    marginBottom: 10,
    resizeMode: 'cover',
    height: 300,
    width: 300,
  },
  imageGuide: {
    marginTop: 100,
    marginBottom: 50,
    resizeMode: 'cover',
    height: 300,
    width: 300,
  },
  title: {
    fontSize: 40,
  },
  titlePost: {
    fontSize: 30,
  },
  description: {
    fontSize: 20,
    textAlign: "center"
  },
  descriptionPost: {
    fontSize: 15,
    textAlign: "center"
  },
  comments: {},
});
export default Guide;
