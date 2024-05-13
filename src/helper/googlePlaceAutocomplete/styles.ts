import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        zIndex: 99,
        width: '80%',
        marginTop: 30,
        position: 'absolute',
        borderRadius : 6
    },
    textInputContainer: {
        width: '100%',
        height: 45,
        borderRadius : 6
    },
    textInput: {
        borderWidth: 0.2,
        height: '100%',
        borderRadius: 0,
    },
    btnContainer : {
        width : 45,
        borderWidth :0.2,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#bfc0c0'
    }
})