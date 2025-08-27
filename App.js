import React, { useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

/**
 * The root component of the application.
 * It determines whether to show the authentication flow or the main app
 * based on the `isLoggedIn` state.
 */
const App = () => {
  // In a real app, this initial state would be determined by checking for a stored auth token.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This function will be passed down to the authentication screens
  // to update the state upon successful login or registration.
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // The AuthNavigator will be displayed when the user is logged out.
  // The AppNavigator will be displayed when the user is logged in.
  // We pass the `handleLoginSuccess` function to the AuthNavigator.
  return isLoggedIn ? <AppNavigator /> : <AuthNavigator onLoginSuccess={handleLoginSuccess} />;
};

export default App;
