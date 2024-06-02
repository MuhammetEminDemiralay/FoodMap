import React, { useState } from 'react'
import { Dimensions, Modal, Pressable, Text, View } from 'react-native'
import { styles } from './styles'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/authSlice'


const { height } = Dimensions.get("window")
const SettingsScreen = () => {


    const dispatch: any = useDispatch();


    return (
        <View style={styles.container}>
            <Pressable style={{borderWidth : 1, backgroundColor : '#fff', width : 150, height : 45}} onPress={() => dispatch(logout())}>
                <Text>ÇIKIŞ</Text>
            </Pressable>

        </View>
    )
}

export default SettingsScreen
