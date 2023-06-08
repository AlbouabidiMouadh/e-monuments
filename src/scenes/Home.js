import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../config/url';

const postStyles = StyleSheet.create({
  vPostContainer: {
    width: Dimensions.get('screen').width,
    height: 400,
    // textAlign: "center"
  },
  vPostImage: {
    resizeMode: 'cover',
    height: 250,
    width: Dimensions.get('screen').width,
  },
  vPostTitle: {
    fontSize: 30,
    textAlign: 'center',
  },
  vPostDescription: {
    textAlign: 'center',
  },
});

export default function Home() {
  const likeButton = async id => {
    try {
      console.log('like pressed');
      const response = axios.put(`http://${url}/post-like/${id}`, userid);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPosts = () => {
    axios
      .get(`http://${url}/all-post`)
      .then(result => {
        // console.log(result.data);
        setData(result.data);
      })
      .catch(err => console.log(err));
  };
  const dataToken = AsyncStorage.getItem('AccessToken');
  const [user, setUser] = useState();
  const [userid, setId] = useState();
  const navigation = useNavigation();
  const [isLogged, setIsLogged] = useState(false);
  const [data, setData] = useState(fetchPosts());
  const [term, setTerm] = useState('');
  const filter = () => {
    fetchPosts();
    setData(
      data.filter(item => {
        return item.title
          .toLocaleLowerCase()
          .includes(term.toLocaleLowerCase());
      }),
    );
  };
  const func = async () => {
    try {
      const d = await AsyncStorage.getItem('AccessToken');
      const u = await AsyncStorage.getItem('user');
      const id = await AsyncStorage.getItem('id');
      console.log(u);
      setUser(u);
      setId(JSON.parse(id));
      console.log(d);

      setIsLogged(d);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // fetchPosts();
    console.log('started waitin');
    func();
    console.log('done');
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          size={18}
          style={styles.iconStyle}
          name="close"
          color="red"
          onPress={() => {
            setTerm('');
          }}
        />
        <TextInput
          style={styles.searchInputStyle}
          placeholder="Search"
          onChangeText={newText => {
            setTerm(newText);
          }}
          value={term}
        />
        <Icon
          size={18}
          style={styles.iconStyle}
          name="search"
          color="black"
          onPress={filter}
        />
      </View>

      <FlatList
        scrollEnabled={true}
        data={data}
        keyExtractor={post => post._id}
        ListEmptyComponent={() => <Text>pas de publication</Text>}
        renderItem={({item}) => {
          return (
            <View style={postStyles.vPostContainer}>
              <Image
                style={postStyles.vPostImage}
                source={{
                  uri: `http://${url}/pictures/${String(item.image)}.jpg`,
                }}
              />
              <Icon
                size={30}
                style={styles.iconStyle}
                name="heart"
                color="red"
                onPress={() => {
                  likeButton(item._id);
                }}
              />
              <Text style={postStyles.vPostTitle}>{item.title + '  '}</Text>
              <Text style={postStyles.vPostDescription}>
                {item.description}
              </Text>
              <TouchableOpacity
                // style= {{borderColor:"black", borderRadius: 5, borderWidth:1, width:100, marginLeft: "35%"}}
                onPress={() => {
                  if (isLogged) navigation.navigate('post', {post: item});
                  else alert('you need to sign in to see this content');
                }}>
<<<<<<< HEAD
                <Text style={{textAlign: 'center'}}>ReadMore </Text>
=======
                <Text style={{textAlign: 'center'}}>
                  Plus {' '}
                  
                </Text>
>>>>>>> 3fd9de2d53d7e708aabb9c1fff5e743dc8bd41e3
                <Text style={{textAlign: 'center'}}>
                  Creer par {item.createdBy}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchInputStyle: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 0,
    margin: 0,
  },
  iconStyle: {
    marginHorizontal: 8,
  },
});
