import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    options: {
        width: '100%',
        height: 50,
        flexDirection: 'row'
    },
    option: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionText: {
        fontSize: 16,
        fontWeight: '500'
    },
    followerBox: {

    },
    followedBox: {

    },
    listContainer: {
        height : '100%',
        alignItems: 'center',
        backgroundColor: 'skyblue',
        padding : 10,
        rowGap : 5
    },
    blok: {
        height: 60,
        borderWidth: 1,
        flexDirection : 'row',
        alignItems : 'center', 
        justifyContent : 'space-around',
    },
})