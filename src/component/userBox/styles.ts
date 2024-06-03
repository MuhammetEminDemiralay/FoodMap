import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
        flexDirection: 'row',
    },
    profileImageBox: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImage: {
        width: '90%',
        height: '90%',
        borderRadius: 50
    },
    infoBox: {
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 10,
        rowGap: 3
    },
    nickName: {

    },
    nickNameText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff'
    },
    name: {
        flexDirection: 'row'
    },
    nameText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#d1d1cf'
    }

})