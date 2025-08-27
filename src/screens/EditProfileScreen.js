import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import StyledButton from '../components/StyledButton';
import UserService from '../services/UserService';
import { colors } from '../theme/colors';
import { fontSizes } from '../theme/typography';

const EditProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [tagline, setTagline] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Pre-fill the form with the user's current data
    UserService.getUserProfile('some-user-id').then(user => {
      setUsername(user.username);
      setTagline(user.tagline);
    });
  }, []);

  const handleSave = () => {
    setIsSubmitting(true);
    UserService.updateUserProfile('some-user-id', { username, tagline })
      .then(() => {
        Alert.alert('Success', 'Your profile has been updated.');
        navigation.goBack();
      })
      .catch(err => {
        console.error(err);
        Alert.alert('Error', 'Could not update your profile.');
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Tagline</Text>
      <TextInput
        style={[styles.input, styles.taglineInput]}
        value={tagline}
        onChangeText={setTagline}
        multiline
      />
      <StyledButton
        title={isSubmitting ? 'Saving...' : 'Save Changes'}
        onPress={handleSave}
        disabled={isSubmitting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  label: {
    fontSize: fontSizes.body,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: fontSizes.body,
    marginBottom: 20,
  },
  taglineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default EditProfileScreen;
