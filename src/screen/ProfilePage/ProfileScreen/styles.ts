import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000814'
    },
    headerContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    headerBox: {
        width: '100%',
        height: '100%',
    },
    topBox: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        backgroundColor: '#368f8b',
    },
    nameBox: {
        width: '100%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameText: {
        fontSize: 24,
        fontFamily: 'Roboto',
        fontWeight: '600'
    },
    followOptions: {
        width: '100%',
        height: '80%',
        flexDirection: 'row',
    },
    options: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    option: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#780000'
    }

    ,
    mainContainer: {
    },
    post: {
        borderWidth: 1,
        borderColor: '#fff'
    },
    postImage: {
        width: '100%',
        height: '100%'
    }

})