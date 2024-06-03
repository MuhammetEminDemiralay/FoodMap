import React from 'react'
import { Dimensions, Image, Pressable, Text, View } from 'react-native'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get("window");

const UserBox = ({ item }: any) => {

    const navigation: any = useNavigation();

    return (
        <Pressable onPress={() => navigation.navigate('friendDetails',)} style={styles.container}>
            <View style={[{ width: width * 0.2 }, styles.profileImageBox]}>
                <Image
                    style={styles.profileImage}
                    source={{ uri: item.profileImage }}
                />
            </View>
            <View style={[{ width: width * 0.7 }, styles.infoBox]}>
                <View style={styles.nickName}>
                    <Text style={styles.nickNameText}>{item.userInfo.nickName}</Text>
                </View>
                <View style={styles.name}>
                    <Text style={styles.nameText}>{item.userInfo.firstName}</Text>
                    <Text style={styles.nameText}>{item.userInfo.lastName}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default UserBox
