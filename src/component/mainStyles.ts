import { StyleSheet } from "react-native";

export const mainStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginTop: 15,
        backgroundColor: '#000814',
    },
    centerBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        fontSize: 17,
        textAlign: 'center',
    },
    centerInput: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: '#e63946'
    },
    text: {
        fontSize: 22,
        fontWeight: '500',
        color: '#fff'
    },
    errorMessage: {
        fontSize: 15,
        color: 'red',
        fontWeight: '500'
    }

})