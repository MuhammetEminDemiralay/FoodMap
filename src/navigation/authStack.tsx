import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {  RegisterPage } from "../screen";
import React from "react";

const AuthStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="register"
                component={RegisterPage}
            />
        </Stack.Navigator>
    )
}

export default AuthStack