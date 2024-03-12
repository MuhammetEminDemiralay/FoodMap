import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginPage, RegisterPage } from '../screen';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='login' component={LoginPage} />
            <Stack.Screen name='register' component={RegisterPage} />
        </Stack.Navigator>
    )
}

export default AuthStack
