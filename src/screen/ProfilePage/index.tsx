import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import FollowScreen from './FollowScreen';
import ProfileScreen from './ProfileScreen';

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
        </Stack.Navigator>
    )
}

export default ProfilePage
