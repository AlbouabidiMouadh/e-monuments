import React, {useEffect, useState} from 'react';
import {Image, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const Guide = ({route}) => {
  const {state} = route.params;
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
      <FlatList
        pagingEnabled={true}
        scrollEnabled={true}
        data={guides}
        // data={guides}
        keyExtractor={guide => guide._id}
        ListEmptyComponent={() => <Text>pas de publication</Text>}
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
