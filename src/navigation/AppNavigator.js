import HomeScreen from '../screens/HomeScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { theme } from '../theme/theme';

// This file simulates the setup of a bottom tab navigator in a mobile app.
// It defines the tabs and links them to the respective screen components,
// establishing the primary navigation flow of the application.

const TabNavigator = {
  initialRouteName: 'Home',
  tabs: [
    {
      name: 'Home',
      component: HomeScreen,
      icon: 'home-icon', // Placeholder for the actual icon asset
    },
    {
      name: 'Create Post',
      component: CreatePostScreen,
      icon: 'add-circle-icon', // Placeholder for the plus icon
    },
    {
      name: 'Profile',
      component: ProfileScreen,
      icon: 'profile-icon', // Placeholder for the profile icon
    },
  ],
  // Styling for the tab bar would be applied using our defined theme
  tabBarOptions: {
    activeTintColor: theme.colors.primary,
    inactiveTintColor: theme.colors.grey,
    showLabel: false, // Icons only, as is common in modern UI
    style: {
        // Further styling like background color would go here
    }
  },
};

export default TabNavigator;
