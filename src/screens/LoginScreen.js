import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import StyledButton from '../components/StyledButton';
import AuthService from '../auth/AuthService';
import { colors } from '../theme/colors';
import { fontSizes } from '../theme/typography';

const LoginScreen = ({ navigation, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    AuthService.login(email, password)
      .then(response => {
        console.log('Login successful:', response);
        onLoginSuccess();
      })
      .catch(err => {
        console.error(err);
        setError('Invalid email or password.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
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
      <StyledButton title="Login" onPress={handleLogin} />
      <StyledButton title="Sign In with Google" onPress={() => {}} variant="secondary" style={{marginTop: 10}} />
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
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

export default LoginScreen;
