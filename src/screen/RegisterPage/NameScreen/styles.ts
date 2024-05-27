import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fefae0',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    box: {
        width: '80%',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#0077b6'
    },
    inputBox: {
        width: '85%',
        height: 45,
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        marginVertical: 10
    },
    inputText: {
        color: '#fff',
        fontSize: 18,
        width: '100%',

    },
    iconBox: {
        width: '15%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    page: {
        position: 'absolute',
        top: 50,
        fontSize: 25
    }

})