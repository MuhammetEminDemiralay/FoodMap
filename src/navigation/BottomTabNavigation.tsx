import { Text, View } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator, DrawerContent, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { HomePage, ProfilePage } from "../screen";
import SearchPage from "../screen/SearchPage";
import NotificationPage from "../screen/NotificationPage";
import { FontAwesome, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Map from "../screen/Map";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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
                headerLeftContainerStyle: {
                    borderWidth: 2
                },
                headerRightContainerStyle: {
                    borderWidth: 2
                },
                headerTitleAlign: 'center',
                tabBarBackground: () => (
                    <View style={{ width: '100%', backgroundColor: 'skyblue' }}>

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
                <Tab.Screen
                name="map"
                component={Map}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name="user-alt" size={24} color="black" />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <Content {...props} />}>
            <Drawer.Screen options={{ title: "", }} name="bottomTab" component={BottomTabNavigation} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator


const Content = (props: any) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: "red" }}>
            </View>
            <View style={{ flex: 3, backgroundColor: 'yellow' }}>
                <DrawerContentScrollView>
                    <DrawerItem label="Home" onPress={() => props.navigation.navigate("home")} />
                    <DrawerItem label="Profile" onPress={() => props.navigation.navigate("profile")} />
                    <DrawerItem label="Map" onPress={() => props.navigation.navigate("map")} />
                </DrawerContentScrollView>
            </View>
        </View>
    )
}