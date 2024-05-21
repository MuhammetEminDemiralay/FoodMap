import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import NotificationScreen from './NotificationScreen';
import MessageScreen from './MessageScreen';
import MainScreen from './MainScreen';

const HomePage = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='main'
        component={MainScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='notification'
        component={NotificationScreen}
      />
      <Stack.Screen
        name='message'
        component={MessageScreen}
      />
    </Stack.Navigator>
  )
}

export default HomePage
