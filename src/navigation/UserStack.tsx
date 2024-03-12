import React from 'react'
import { HomePage, ProfilePage } from '../screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator();

const UserStack = () => {
    return (
        <BottomTabNavigation />
    )
}

export default UserStack
