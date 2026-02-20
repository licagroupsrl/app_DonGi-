import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import Screens (to be created)
import HomeScreen from '../screens/HomeScreen';
import LibraryScreen from '../screens/LibraryScreen';
import ChatScreen from '../screens/ChatScreen';

import { COLORS } from '../constants/theme';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Libreria') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Chat Don') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.accent, // Bordeaux for active
        tabBarInactiveTintColor: COLORS.secondaryText, // Grey for inactive
        tabBarStyle: {
          backgroundColor: COLORS.background, // Ivory background
          borderTopColor: COLORS.primary, // Gold border on top
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 5,
        },
        headerStyle: {
          backgroundColor: COLORS.accent,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'DonGiò - Live' }}
      />
      <Tab.Screen
        name="Libreria"
        component={LibraryScreen}
        options={{ title: 'Libreria Spirituale' }}
      />
      <Tab.Screen
        name="Chat Don"
        component={ChatScreen}
        options={{ title: 'Parla col Don' }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
