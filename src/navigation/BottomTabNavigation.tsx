import { Text, View } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomePage, ProfilePage } from "../screen";
import SearchPage from "../screen/SearchPage";
import NotificationPage from "../screen/NotificationPage";
import { FontAwesome, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerTintColor: "red",
                headerBackground: () => (
                    <View style={{ width: '100%', height: '100%', backgroundColor: 'skyblue' }}></View>
                ),
                headerBackgroundContainerStyle: {
                    borderBottomWidth: 2,
                    borderBottomColor: "#000814"
                },
                headerLeft: () => (
                    <FontAwesome name="home" size={24} color="#000814" />
                ),
                headerLeftContainerStyle : {
                    borderWidth : 2
                },
                headerRightContainerStyle : {
                    borderWidth : 2
                },
                headerTitleAlign : 'center',
                tabBarBackground : () => (
                    <View style={{width :'100%', backgroundColor : 'skyblue'}}>

                    </View>
                ),
            }}
        >
            <Tab.Screen
                name="home"
                component={HomePage}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome name="home" size={24} color="black" />
                    ),
                }}
            />
            <Tab.Screen
                name="search"
                component={SearchPage}
                options={{
                    tabBarIcon: () => (
                        <Feather name="search" size={24} color="black" />
                    )
                }}
            />
            <Tab.Screen
                name="notification"
                component={NotificationPage}
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="notifications-sharp" size={24} color="black" />
                    )
                }}
            />
            <Tab.Screen
                name="profile"
                component={ProfilePage}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name="user-alt" size={24} color="black" />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation
