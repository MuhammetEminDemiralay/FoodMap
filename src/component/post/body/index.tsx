import React, { useEffect, useState } from 'react'
import { Text, FlatList, Image, View, Dimensions, Button } from 'react-native'
import { styles } from './styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Header from '../header'
import Bottom from '../bottom'

const { width } = Dimensions.get("window")

const Post = ({ item, currentUser }: any) => {

    

    return (
        <View style={[{ width: width * 1, height: width * 1.75 }, styles.container]}>
            <Header friendProfile={item.userProfile} currentUser={currentUser} />

            <View style={[{ width: width * 1, height: width * 1.25 }, styles.bodyContainer]}>
                <FlatList
                    data={item?.fileData?.fileUrl}
                    renderItem={({ item, index }) => (
                        <Image
                            key={index}
                            style={[{ width: width, height: width * 1.25 },
                            styles.image]} source={{ uri: item }} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ height: width * 1.25 }}
                />
            </View>

            <Bottom postData={item.postData} />
        </View>
    )
}

export default Post
