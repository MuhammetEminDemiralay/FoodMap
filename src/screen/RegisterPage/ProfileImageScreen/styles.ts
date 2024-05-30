import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    profileImageBox: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 140,
        elevation: 20,
    },
    profileImage: {
        width: '98%',
        height: '98%',
        borderRadius: 140,
        resizeMode: 'cover'
    },
    options: {
        marginTop: 10,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        columnGap : 20
    }

})