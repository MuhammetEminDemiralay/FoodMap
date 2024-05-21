import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topBox: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },
    notificationIcon: {
        position: 'absolute',
        right: 50
    },
    messageIcon: {
        position: 'absolute',
        right: 10
    },
    postContainer: {
        minWidth: '100%',
    },
    topContainer: {
        width: '100%',
        minHeight: 100,
        maxHeight: 250,
        marginBottom: 40
    }
})