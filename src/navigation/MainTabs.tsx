import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import MyPhotosScreen from '../screens/MyPhotosScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MainTabs() {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = 'home';

          if (route.name === 'Main') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MyPhotos') {
            iconName = focused ? 'image' : 'image-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#800080',
        tabBarInactiveTintColor: '#ffffff',
        tabBarInactiveBackgroundColor: '#000000',
        tabBarActiveBackgroundColor: '#000000',
        headerShown: false
      })}>
      <Tabs.Screen name="Main" component={MainScreen} />
      <Tabs.Screen name="MyPhotos" component={MyPhotosScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}
