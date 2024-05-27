import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import ChatListScreen from './ChatListScreen'
import UserMessageScreen from './UserListScreen'
import UserListScreen from './UserListScreen'

const ChatPage = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='chatList'
                component={ChatListScreen}
            />
            <Stack.Screen
                name='userMessage'
                component={UserMessageScreen}
            />
            <Stack.Screen
                name='userList'
                component={UserListScreen}
            />
        </Stack.Navigator>
    )
}

export default ChatPage
