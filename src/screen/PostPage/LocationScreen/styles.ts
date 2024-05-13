import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    mapContainer: {
        width: '100%',
        height: '80%',
        zIndex : 1,
        position : 'relative'
    },
    currentLocationBtn : {
        width : 40,
        height : 40,
        borderWidth : 1,
        borderRadius : 6,
        position : 'absolute',
        bottom : 10,
        right : 10,
        zIndex : 2,
        backgroundColor : 'red'
    }

})