import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    optionContainer: {
        width: '100%',
        height: '20%',
        padding: 15,
        backgroundColor: '#2d3142',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    topBox: {
        width: '100%',
        height: '45%',
    },
    changeOptionBox : {
        height : '100%',
        flexDirection : 'row',
        backgroundColor : '#bfc0c0',
        borderRadius : 6,
        alignItems : 'center',
        justifyContent : 'space-evenly',
    },
    changeOptionText : {
        fontSize : 20,
    },
    changeOptionIcon: {
        position : 'absolute',
        right : 20
    },
    bottomBox: {
        width : '100%',
        height : '45%',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    options: {
        width : '78%',
        height : '100%',
        backgroundColor : '#bfc0c0',
        borderRadius : 6
    },
    sendPost: {
        width : '18%',
        height: '100%',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#bfc0c0',
        borderRadius : 6
    },
})