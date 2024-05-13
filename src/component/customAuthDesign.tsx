import React from 'react'
import { StyleSheet, View } from 'react-native'

const CustomAuthDesign = ({ top, bottom, rigthRadius, leftRadius }: any) => {
    return (
        <View style={styles.design}>
            <View style={styles.top}></View>
            <View style={styles.bottom}></View>
        </View>
    )
}

export default CustomAuthDesign

const styles = StyleSheet.create({
    design: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -1,
        justifyContent :'space-between'
    },
    top: {
        width : '100%',
        height : '28%',
        backgroundColor : '#e63946',
        borderBottomLeftRadius : 180,
        borderBottomWidth : 20,
        borderLeftWidth : 4,
        borderTopColor : '#000814'
    },
    bottom: {
        width : '100%',
        height : '28%',
        backgroundColor : '#e63946',
        borderTopRightRadius : 180,
        borderTopColor : '#000814',
        borderTopWidth : 4,
        borderRightWidth : 20
    }
})