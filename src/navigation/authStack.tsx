import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginPage, RegisterPage } from "../screen";

const AuthStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="login"
                component={LoginPage}
            />
            <Stack.Screen
                name="register"
                component={RegisterPage}
            />
        </Stack.Navigator>
    )
}

export default AuthStack