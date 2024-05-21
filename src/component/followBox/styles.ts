import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative',
        maxHeight: 150
    },
    eye: {
        position: 'absolute',
        right: 5,
        top: 5,
        zIndex: 1
    },
    followContainer: {
        padding: 5
    },
    followWrapper: {
        alignItems: 'center',
        padding : 5,
        borderWidth : 1,
        borderRadius : 10,
        backgroundColor : '#fefae0'
    },
    profileImageBox: {
        width: '100%',
        height: '40%',
        alignItems: 'center'
    },
    profileImage: {
        width: '40%',
        height: '100%',
        borderRadius: 50,
    },
    profileTextBox: {
        width: '100%',
        height: '35%',
        alignItems: 'center'
    },
    profileText: {
        fontSize: 14,
        fontWeight: '500'
    },
    followBtn: {
        width: '90%',
        height: '25%',
        backgroundColor: '#dda15e',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },
    followText: {
        color: '#000814',
        fontWeight: '500',
        fontSize: 16
    }
})