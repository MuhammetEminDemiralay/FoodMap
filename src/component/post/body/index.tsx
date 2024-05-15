import React, { useState } from 'react'
import { Text, FlatList, Image, View, Dimensions } from 'react-native'
import { styles } from './styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Header from '../header'
import Bottom from '../bottom'

const { width } = Dimensions.get("window")

const Post = ({ item }: any) => {

    const [state, setState] = useState();

    return (
        <View style={[{ width: width * 1, height: width * 1.75 }, styles.container]}>
            <Header />

            <View style={[{ width: width, height: width * 1.25 }, styles.body]}>
                <FlatList
                    data={item}
                    renderItem={({ item, index }) => (
                        <Image style={[{ width: width, height: width * 1.25 }, styles.image]} source={{ uri: item }} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ height: width * 1.25 }}
                />
            </View>
            
            <Bottom />
        </View>
    )
}

export default Post
