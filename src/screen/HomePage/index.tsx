import { View, Text, ActivityIndicator, Button, FlatList, Appearance, ScrollView, RefreshControl, SafeAreaView } from "react-native"
import { styles } from "./styles"
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useRef, useState } from "react";
import Post from "../../component/post";

import { datas } from "./datas";
import Story from "../../component/story";


const HomePage = () => {





    useEffect(() => {

    })


    const onRefresh = () => {


    }


    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.storyList}>
                <FlatList
                    data={datas}
                    renderItem={({ item, index }) => (
                        <Story key={index} item={item} />
                    )}
                    horizontal
                />
            </View>
            <View style={styles.postList}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={onRefresh}
                        />
                    }
                    data={datas}
                    renderItem={({ item, index }) => (
                        <Post key={index} item={item} />
                    )}
                />
            </View>
        </SafeAreaView>

    )
}

export default HomePage