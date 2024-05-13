import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#343a40',
    },
    fileContainer: {
        width: '100%',
        height: '42%',
    },
    file: {
        width: '100%',
        height: '100%',
        resizeMode: "cover"
    },
    fileBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 20,
        width: '100%',
        height: '8%',
        backgroundColor: '#343a40',
        borderBottomWidth :1,
        borderBottomColor : '#fff',
        position : 'relative'
    },
    selectedFilesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        height: '50%'
    },
    imageWrapper: {
        height: '33.33%',
        padding : 5,
        position : 'relative'

    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    imageDelete : {
        position : 'absolute',
        top : 8,
        right : 7,
        zIndex : 2
    },
    route : {

    }

})