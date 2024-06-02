import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#000814',
    },
    profileBox: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'red',
        borderRadius: 50
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50
    },
    name: {
        flex: 14,
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        color: '#fff',

    },
    options: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 3,
    }
})