import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    box: {
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 50,
        columnGap: 10,

    },
    signUp: {
        backgroundColor: '#fff',
        height: 43,
        width: 150,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        elevation: 5
    },
    signUpText: {
        fontSize: 18,
        fontWeight: '500',
        alignSelf: 'center'
    },
    googleSignIn: {
        height: 50,
    }
})