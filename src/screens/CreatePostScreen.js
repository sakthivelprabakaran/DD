import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import PostService from '../services/PostService';
import StyledButton from '../components/StyledButton';
import { colors } from '../theme/colors';
import { fontSizes } from '../theme/typography';

const CreatePostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePost = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Please fill out both the title and content.');
      return;
    }
    setIsSubmitting(true);
    PostService.createPost({ title, content })
      .then(() => {
        Alert.alert('Success', 'Your post has been created!');
        navigation.goBack();
      })
      .catch(err => {
        console.error(err);
        Alert.alert('Error', 'Could not create your post. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.headerTitle}>Create a New Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Post Title..."
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Start Writing Here..."
        value={content}
        onChangeText={setContent}
        multiline
      />
      <StyledButton
        title={isSubmitting ? 'Posting...' : 'Post Now'}
        onPress={handlePost}
        disabled={isSubmitting}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontSize: fontSizes.largeTitle,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: fontSizes.body,
    marginBottom: 16,
  },
  contentInput: {
    height: 200,
    textAlignVertical: 'top', // For Android
  },
});

export default CreatePostScreen;
