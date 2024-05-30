import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ChatPage, HomePage, MapPage, PostPage, ProfilePage } from "../screen";
import { Ionicons, FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';
import React from "react";


const UserStack = () => {

    const Tab = createBottomTabNavigator();

    // {
    //     headerShown: false,
    //     headerStyle: { backgroundColor: "red" },
    //     tabBarStyle: {
    //         height: '7%'
    //     },
    //     tabBarShowLabel: false,
    //     tabBarIcon
    // }

    return (
        <Tab.Navigator
            screenOptions={({ }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#27fb6b",
                    height: '7%'
                },
                tabBarShowLabel: false,
            })}
        >
            <Tab.Screen
                name="home"
                component={HomePage}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome sign name="home" size={30} color="black" />
                    ),
                }}
            />
            <Tab.Screen
                name="map"
                component={MapPage}
                options={{
                    tabBarIcon: () => (
                        <Feather name="map" size={28} color="black" />
                    )
                }}
            />
            <Tab.Screen
                name="post"
                component={PostPage}
                options={{
                    tabBarIcon: () => (
                        <MaterialIcons name="add-circle-outline" size={32} color="black" />
                    )
                }}
            />
            <Tab.Screen
                name="chat"
                component={ChatPage}
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="chatbox-ellipses" size={28} color="black" />
                    )
                }}
            />
            <Tab.Screen
                name="profile"
                component={ProfilePage}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome name="user" size={30} color="black" />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default UserStack