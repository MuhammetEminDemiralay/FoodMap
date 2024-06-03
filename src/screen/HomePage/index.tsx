import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import NotificationScreen from './NotificationScreen';
import MessageScreen from './MessageScreen';
import MainScreen from './MainScreen';
import FriendDetailScreen from './FriendDetailScreen/index.';

const HomePage = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name='main'
        component={MainScreen}
      />
      <Stack.Screen
        name='notification'
        component={NotificationScreen}
      />
      <Stack.Screen
        name='message'
        component={MessageScreen}
      />
      <Stack.Screen
        name='friendDetails'
        component={FriendDetailScreen}
      />
    </Stack.Navigator>
  )
}

export default HomePage
