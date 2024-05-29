import { StyleSheet } from "react-native";

export const mainStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fefae0',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        rowGap : 20
    },
    box: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        position: 'relative',
        backgroundColor: '#fff',
        opacity: 0.75,
        elevation: 20,
        padding: 10
    },
    inputBox: {
        width: '85%',
        height: '100%',
        justifyContent: 'center',
        borderRadius: 10,
    },
    inputText: {
        fontSize: 18,
        fontWeight : '500'
    },
    iconBox: {
        width: '15%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleBox: {
        position: 'absolute',
        top: 200
    },
    titleText: {
        fontSize: 30,
        fontWeight: '600'
    }
})