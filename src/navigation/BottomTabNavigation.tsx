import { View } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomePage, ProfilePage } from "../screen";

// const Tab = createBottomTabNavigator();
const Tab = createDrawerNavigator();

const BottomTabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="home" component={HomePage} />
            <Tab.Screen name="profile" component={ProfilePage} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation
