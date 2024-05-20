import React from 'react'
import { View, FlatList, Text, Dimensions, Image, Button, Pressable } from 'react-native'
import { styles } from './styles'
import { Feather } from '@expo/vector-icons/';
import { data } from './data';

const { width } = Dimensions.get("window")

const FollowBox = ({ userData, followBox, setFollowBox }: any) => {




    return (
        <View style={styles.container}>
            <Feather onPress={() => setFollowBox(followBox == false ? true : false)} style={styles.eye} name={followBox == true ? 'eye' : 'eye-off'} size={20} color="#fff" />
            {
                followBox &&
                <FlatList
                    data={userData}
                    renderItem={({ item, index }) => (
                        <View key={index} style={[{ width: width * 1 / 3, height: width * 1 / 3 }, styles.followContainer]}>
                            <View style={styles.followWrapper}>
                                <View style={styles.profileImageBox}>
                                    <Image style={styles.profileImage} source={{ uri: data }} />
                                </View>
                                <View style={styles.profileTextBox}>
                                    <Text style={styles.profileText}>{item.userInfo.firstName}</Text>
                                    <Text style={styles.profileText}>{item.userInfo.lastName}</Text>
                                </View>
                                <Pressable  style={styles.followBtn}>
                                    <Text style={styles.followText}>Takip et</Text>
                                </Pressable>

                            </View>
                        </View>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            }
        </View>
    )
}

export default FollowBox
