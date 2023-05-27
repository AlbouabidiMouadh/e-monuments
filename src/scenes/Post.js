import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import url from "../config/url";

const Post = ({route, Navitgation}) => {
  const {post} = route.params;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: `http://${url}/pictures/${String(post.image)}.jpg`,
        }}
      />
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.description}</Text>
      <View style={styles.comments}>
        {/* {post.comments.map(item => {
          return (
            <Text>
              {item.writer} : {item.comment}
            </Text>
          );
        })} */}
      </View>
      <Text>{post.likes} likes</Text>
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
export default Post;
