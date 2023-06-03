import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const Guide = ({route}) => {
  const {state, stateInfo} = route.params;
  const [guides, setGuides] = useState([]);
  const fetchGuides = async () => {
    const response = await axios.get(`http://${url}/all-guides/${state}`);
    try {
      const data = response.data;
      setGuides(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGuides();
  }, []);
  return (
    <View>
      <View>
        <Text>{stateInfo.title}</Text>
        <Text>{stateInfo.description}</Text>
        <Image
          source={{
            uri: `http://${url}/pictures/GuidesStates/${String(stateInfo.image)}`,
          }}
        />
      </View>
      <FlatList
        pagingEnabled={true}
        scrollEnabled={true}
        data={guides}
        // data={guides}
        keyExtractor={guide => guide._id}
        ListEmptyComponent={() => (
          <Text>
            Les Guides pour cette villes sont en cours de developpement
          </Text>
        )}
        renderItem={({guide}) => {
          return (
            <View style={styles.container}>
              <Image
              style={styles.image}
                source={{
                  uri: `http://${url}/pictures/${String(guide.image)}.jpg`,
                }}
              />
              <Text style={styles.title}>{guide.title}</Text>
              {/* <Text>{guide.location}</Text> */}
              <Text style={styles.description}>{guide.description}</Text>
              <Text style={styles.description}>{guide.likes}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: 100,
    marginBottom: 50,
    resizeMode: 'cover',
    height: 300,
    width: 300,
  },
  title: {
    fontSize: 40,
  },
  description: {
    fontSize: 20,
  },
  comments: {},
});
export default Guide;
