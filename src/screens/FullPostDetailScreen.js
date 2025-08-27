import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import PostService from '../services/PostService';
import { colors } from '../theme/colors';
import { fontSizes, fontStyles } from '../theme/typography';
import Card from '../components/Card';

const FullPostDetailScreen = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PostService.getPostById(postId)
      .then(setPost)
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!post) {
    return <Text style={styles.errorText}>Post not found.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: post.author.avatarUrl }} />
        <Text style={fontStyles.username}>{post.author.username}</Text>
      </View>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.description}</Text>

      <Card style={styles.commentsCard}>
        <Text style={styles.sectionTitle}>Discussion</Text>
        {post.comments && post.comments.map(comment => (
          <View key={comment.id} style={styles.commentContainer}>
            <Text style={styles.commentAuthor}>{comment.author.username}:</Text>
            <Text style={styles.commentText}>{comment.text}</Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { textAlign: 'center', marginTop: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  title: { ...fontStyles.postTitle, fontSize: fontSizes.largeTitle, marginBottom: 16 },
  description: { ...fontStyles.description, fontSize: fontSizes.body, lineHeight: 24, marginBottom: 24 },
  commentsCard: { backgroundColor: '#f0f2f5' },
  sectionTitle: { fontSize: fontSizes.title, fontWeight: 'bold', marginBottom: 12 },
  commentContainer: { marginBottom: 10 },
  commentAuthor: { fontWeight: 'bold', marginBottom: 2 },
  commentText: {},
});

export default FullPostDetailScreen;
