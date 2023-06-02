import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
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
        <Text>{stateInfo.Title}</Text>
        <Text>{stateInfo.description}</Text>
        <Image
          source={{
            uri: `http://${url}/pictures/${String(stateInfo.image)}`,
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
            <View>
              <Image
                source={{
                  uri: `http://${url}/pictures/${String(guide.image)}.jpg`,
                }}
              />
              <Text>{guide.title}</Text>
              <Text>{guide.location}</Text>
              <Text>{guide.description}</Text>
              <Text>{guide.likes}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Guide;
