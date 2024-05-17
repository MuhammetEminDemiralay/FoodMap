import { NavigationContainer } from "@react-navigation/native"
import UserStack from "./userStack";
import AuthStack from "./authStack";
import app from "../../firebaseConfig";
import { useSelector } from "react-redux";
import { StatusBar } from "react-native";
import { decode } from 'base-64';

if (typeof atob === 'undefined') {
    global.atob = decode;
}
const RootNavigation = () => {

    const { isAuth } = useSelector((state: any) => state.auth)


    return (
        <NavigationContainer >
            <StatusBar barStyle={"dark-content"} backgroundColor="#2d3142" />
            {
                isAuth ? <UserStack /> : <AuthStack />
            }
        </NavigationContainer>
    )
}

export default RootNavigation