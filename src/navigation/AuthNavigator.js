import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

/**
 * The navigator for the authentication flow.
 * It manages the Login and Sign Up screens.
 * @param {object} props
 * @param {function} props.onLoginSuccess - Function to call upon successful login/signup.
 */
const AuthNavigator = ({ onLoginSuccess }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/*
        We use a render prop for the component to pass the `onLoginSuccess` function
        down to the LoginScreen and SignUpScreen components.
      */}
      <Stack.Screen name="Login">
        {props => <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />}
      </Stack.Screen>
      <Stack.Screen name="SignUp">
        {props => <SignUpScreen {...props} onLoginSuccess={onLoginSuccess} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
