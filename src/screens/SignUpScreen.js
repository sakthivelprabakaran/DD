import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import StyledButton from '../components/StyledButton';
import AuthService from '../auth/AuthService';
import { colors } from '../theme/colors';
import { fontSizes } from '../theme/typography';

const SignUpScreen = ({ navigation, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    AuthService.register(email, password)
      .then(response => {
        console.log('Sign up successful:', response);
        // Log the user in immediately after a successful registration.
        onLoginSuccess();
      })
      .catch(err => {
        console.error(err);
        setError('Could not create account. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <StyledButton title="Sign Up" onPress={handleSignUp} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: fontSizes.largeTitle,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: colors.text.primary,
  },
  input: {
    height: 50,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: fontSizes.body,
  },
  link: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SignUpScreen;
