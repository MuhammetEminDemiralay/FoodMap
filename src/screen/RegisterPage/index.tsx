import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import PhoneScreen from './PhoneScreen';
import DateOfBirthScreen from './DateOfBirthScreen';
import NickNameScreen from './NickNameScreen';
import NameScreen from './NameScreen';
import ProfileImageScreen from './ProfileImageScreen';
import RegisterScreen from './RegisterScreen';


const RegisterPage = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='registerScreen' component={RegisterScreen} />
            <Stack.Screen name='phone' component={PhoneScreen} />
            <Stack.Screen name='dateOfBirth' component={DateOfBirthScreen} />
            <Stack.Screen name='name' component={NameScreen} />
            <Stack.Screen name='nickName' component={NickNameScreen} />
            <Stack.Screen name='profileImage' component={ProfileImageScreen} />

        </Stack.Navigator>
    )
}

export default RegisterPage
