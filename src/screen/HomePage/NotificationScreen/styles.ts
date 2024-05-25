import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#0c0f0a',
        alignItems: 'center',
        position: 'relative'
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        columnGap: 20,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600'
    },
    notificationBox: {
        marginVertical: 10,
        flexDirection: 'row'
    },
    profileImageBox: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImage: {
        width: '100%',
        height: '90%',
        borderRadius: 50
    },
    optionsBox: {
        width: '40%',
        alignItems: 'center',
        padding: 10
    },
    optionText : {
        color : '#fff'
    },
    followBtnBox: {
        width: '40%',
        alignItems: 'center',
        padding : 5
    },
    followBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 35,
        borderRadius : 6
    },
    followBtnText: {
        color : '#fff',
        fontSize : 18,
        fontWeight : '500'
    }

})