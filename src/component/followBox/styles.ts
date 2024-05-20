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
        backgroundColor: '#fff',
        padding: 5
    },
    followWrapper: {
        alignItems: 'center',
    },
    profileImageBox: {
        width: '100%',
        height: '45%',
        alignItems: 'center'
    },
    profileImage: {
        width: '45%',
        height: '100%',
        borderRadius: 50,
    },
    profileTextBox: {
        width: '100%',
        height: '30%',
        alignItems: 'center'
    },
    profileText: {
        fontSize: 14,
        fontWeight: '500'
    },
    followBtn: {
        width: '90%',
        height: '25%',
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },
    followText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 16
    }
})