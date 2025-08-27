import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import SearchService from '../services/SearchService';
import PostCard from '../components/PostCard';
import { colors } from '../theme/colors';

const SearchResultScreen = ({ route, navigation }) => {
  const { query } = route.params;
  const [results, setResults] = useState({ posts: [], users: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Posts');

  useEffect(() => {
    SearchService.performSearch(query)
      .then(response => setResults(response.results))
      .finally(() => setLoading(false));
  }, [query]);

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" style={styles.loader} />;
    }

    if (activeTab === 'Posts') {
      return (
        <FlatList
          data={results.posts}
          renderItem={({ item }) => (
            <PostCard post={item} onPress={() => navigation.navigate('PostDetail', { postId: item.id })} />
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={styles.emptyText}>No posts found.</Text>}
        />
      );
    } else {
      return (
        <FlatList
          data={results.users}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Text>{item.username}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={styles.emptyText}>No users found.</Text>}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Posts')} style={[styles.tab, activeTab === 'Posts' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'Posts' && styles.activeTabText]}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Users')} style={[styles.tab, activeTab === 'Users' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'Users' && styles.activeTabText]}>Users</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  tabContainer: { flexDirection: 'row', backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  tab: { flex: 1, padding: 16, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: colors.primary },
  tabText: { fontWeight: '600', color: colors.text.secondary },
  activeTabText: { color: colors.primary },
  emptyText: { textAlign: 'center', marginTop: 40, color: colors.text.secondary },
  userItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: colors.white },
});

export default SearchResultScreen;
