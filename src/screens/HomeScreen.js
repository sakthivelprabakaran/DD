import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import PostCard from '../components/PostCard';
import PostService from '../services/PostService';
import SearchBar from '../components/SearchBar';
import { colors } from '../theme/colors';
import { fontSizes } from '../theme/typography';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PostService.getFeedPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (query) => {
    navigation.navigate('SearchResults', { query });
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <FlatList
      style={styles.container}
      data={posts}
      renderItem={({ item }) => (
        <PostCard
          post={item}
          onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
          onDiscussPlusPress={() => navigation.navigate('Booking', { authorId: item.author.id })}
        />
      )}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <>
          <Text style={styles.headerTitle}>Device Discuss</Text>
          <SearchBar onSearch={handleSearch} />
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontSizes.largeTitle,
    fontWeight: 'bold',
    color: colors.text.primary,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#f0f2f5',
  },
});

export default HomeScreen;
