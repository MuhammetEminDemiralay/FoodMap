import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: '100%',
        backgroundColor: '#000814'
    },
    headerContainer: {
        position: 'relative',
        borderBottomWidth: 2,
        borderBottomColor: '#fff'
    },
    topBox: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    profileImageBox: {
        width: '40%',
        height: '80%',
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    image: {
        width: '95%',
        height: '95%',
        borderRadius: 80
    },
    followBox: {
        width: '70%',
        height: '100%',
    },
    bottomBox: {
        width: '100%',
        height: '50%',
    },
    nameBox: {
        width: '100%',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    nameText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#fff'
    },
    followOptions: {
        width: '100%',
        height: '70%',
        flexDirection: 'row',
    },
    options: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    option: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#780000'
    },
    post: {
        borderWidth: 1,
        borderColor: '#fff',
    },
    postImage: {
        width: '100%',
        height: '100%'
    },
    settings: {
        position: 'absolute',
        right: 15,
        top: 20
    }

})