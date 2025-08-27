import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Card from './Card';
import StyledButton from './StyledButton';
import { fontStyles, fontSizes } from '../theme/typography';
import { colors } from '../theme/colors';

const PostCard = ({ post, onPress, onDiscussPlusPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card>
        <View style={styles.header}>
          <Image style={styles.avatar} source={{ uri: post.author.avatarUrl }} />
          <Text style={fontStyles.username}>{post.author.username}</Text>
        </View>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.description} numberOfLines={3}>{post.description}</Text>
        <View style={styles.actions}>
          <Text style={styles.actionText}>❤️ {post.likes} Likes</Text>
          <Text style={styles.actionText}>💬 {post.commentCount} Discuss</Text>
          {onDiscussPlusPress && (
            <StyledButton title="Discuss+" onPress={onDiscussPlusPress} variant="secondary" style={styles.discussPlusButton} />
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: colors.grey,
  },
  title: {
    ...fontStyles.postTitle,
    fontSize: fontSizes.subtitle,
    marginBottom: 8,
  },
  description: {
    ...fontStyles.description,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  actionText: {
    color: colors.text.secondary,
  },
  discussPlusButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});

export default PostCard;
