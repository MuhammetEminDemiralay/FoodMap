import React from 'react'
import { Dimensions, View, Text, Image } from 'react-native'
import { styles } from './styles'
import { Entypo } from '@expo/vector-icons'
import { data } from './data'

const { width } = Dimensions.get("window")
const Header = () => {



    return (
        <View style={[{ height: width * 0.15 }, styles.header]}>
            <View style={styles.profileBox}>
                <View style={styles.profileCircle}>
                    <Image style={styles.profileImage} source={{uri : data}}/>
                </View>
            </View>
            <View style={styles.name}>
                <Text style={styles.text}>Burger King</Text>
            </View>
            <View style={styles.options}>
                <Entypo name="dots-three-vertical" size={22} color="#fff" />
            </View>
        </View>
    )
}

export default Header
