import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import FollowScreen from './FollowScreen';
import ProfileScreen from './ProfileScreen';
import { Settings } from 'react-native';
import SettingsScreen from './SettingsScreen';
import PostDetailScreen from './PostDetail';

const ProfilePage = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='profileScreen'
                component={ProfileScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='followScreen'
                component={FollowScreen}
                options={{
                    headerTitle: 'muhammets41'
                }}
            />
            <Stack.Screen
                name='settings'
                component={SettingsScreen}

            />
            <Stack.Screen
                name='postDetail'
                component={PostDetailScreen}
               
            />
        </Stack.Navigator>
    )
}

export default ProfilePage
