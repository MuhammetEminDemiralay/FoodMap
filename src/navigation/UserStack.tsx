import React from 'react'
import { HomePage, ProfilePage } from '../screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator} from '@react-navigation/drawer'
import BottomTabNavigation from './BottomTabNavigation';
import Drawer from './BottomTabNavigation';
import DrawerNavigator from './BottomTabNavigation';


const Stack = createDrawerNavigator();

const UserStack = () => {
    return (
        <DrawerNavigator/>
    )
}

export default UserStack
