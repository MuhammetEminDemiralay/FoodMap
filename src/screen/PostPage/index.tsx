import { View, Text } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CameraScreen from "./CameraScreen"
import FilterScreen from "./FilterScreen"
import LocationScreen from "./LocationScreen"
const PostPage = () => {

    const Tab = createNativeStackNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen
                name="camera"
                component={CameraScreen}
            />
            <Tab.Screen
                name="filter"
                component={FilterScreen}
            />
            <Tab.Screen
                name="location"
                component={LocationScreen} />
        </Tab.Navigator>
    )

}

export default PostPage