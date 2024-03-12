import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import UserStack from './UserStack'
import AuthStack from './AuthStack'
import app from '../../firebaseConfig'

const RouteNavigation = () => {

    let isAuth: boolean = false;

    return (
        <NavigationContainer>
            {
                !isAuth ? <AuthStack /> : <UserStack />
            }
        </NavigationContainer>
    )
}

export default RouteNavigation
