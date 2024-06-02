import React from 'react'
import { Dimensions, View, Text, Image } from 'react-native'
import { styles } from './styles'
import { Entypo } from '@expo/vector-icons'
import { data } from './data'

const { width } = Dimensions.get("window")
const Header = ({ currentUser, friendProfile }: any) => {

    console.log(friendProfile?.userInfo?.nickName);


    return (
        <View style={[{ height: width * 0.15 }, styles.header]}>
            <View style={styles.profileBox}>
                <View style={styles.profileCircle}>
                    {
                        currentUser != null ?
                            <Image style={styles.profileImage} source={{ uri: data }} /> :
                            <Image style={styles.profileImage} source={{ uri: data }} />
                    }
                </View>
            </View>
            <View style={styles.name}>
                {
                    currentUser != null ?
                        <Text style={styles.text}>{currentUser?.userData.userInfo.nickName}</Text> :
                        <Text style={styles.text}>{friendProfile?.userInfo?.nickName}</Text>
                }
            </View>
            <View style={styles.options}>
                <Entypo name="dots-three-vertical" size={22} color="#fff" />
            </View>
        </View >
    )
}

export default Header
