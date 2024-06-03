import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000814',
        alignItems: 'center',
    },
    searchBox: {
        width: '90%',
        height: 50,
        flexDirection: 'row',
        marginVertical: 20
    },
    inputBox: {
        width: '85%',
        height: '100%',
        backgroundColor: 'skyblue',
        paddingHorizontal: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    iconBox: {
        width: '15%',
        height: '100%',
        backgroundColor: 'lime',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    searchBtnBox: {
        width: '20%',
        height: '100%',
        backgroundColor: 'tomato',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileListBox: {
        rowGap: 10
    },
    profileBox: {
        width: '100%',

    },
    profileText: {
        fontSize: 20,
        color: '#fff'
    }

})