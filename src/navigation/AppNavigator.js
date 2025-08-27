import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FullPostDetailScreen from '../screens/FullPostDetailScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import DeviceManagementScreen from '../screens/DeviceManagementScreen';
import NotificationScreen from '../screens/NotificationScreen';
import CreatorDashboardScreen from '../features/discussPlus/CreatorDashboardScreen';
import BookingScreen from '../features/discussPlus/BookingScreen';
import SessionScreen from '../features/discussPlus/SessionScreen';
import RatingScreen from '../features/discussPlus/RatingScreen';
import { theme } from '../theme/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabBarIcon = ({ name, color, size }) => {
  return <Text style={{ color, fontSize: size / 2 }}>{name.substring(0, 2)}</Text>;
};

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeFeed"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Device Discuss',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ marginRight: 16 }}>
              <Text style={{ fontSize: 24 }}>🔔</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="PostDetail" component={FullPostDetailScreen} options={{ title: 'Discussion' }} />
      <Stack.Screen name="SearchResults" component={SearchResultScreen} options={({ route }) => ({ title: `Results for "${route.params.query}"` })} />
      <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Book a Session' }} />
      <Stack.Screen name="Session" component={SessionScreen} options={{ title: 'Live Session' }} />
      <Stack.Screen name="Rating" component={RatingScreen} options={{ title: 'Rate Session' }} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileView" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PostDetail" component={FullPostDetailScreen} options={{ title: 'Discussion' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
      <Stack.Screen name="DeviceManagement" component={DeviceManagementScreen} options={{ title: 'Manage Devices' }} />
      <Stack.Screen name="CreatorDashboard" component={CreatorDashboardScreen} options={{ title: 'Creator Dashboard' }} />
    </Stack.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            return <TabBarIcon name={route.name} color={color} size={size} />;
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.grey,
          headerShown: false, // Hide header for tabs, as stacks have their own
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Create Post" component={CreatePostScreen} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
