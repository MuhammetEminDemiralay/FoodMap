import { View, Text, ActivityIndicator, Button, FlatList, Appearance, ScrollView, RefreshControl, SafeAreaView } from "react-native"
import { styles } from "./styles"
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useRef, useState } from "react";
import Post from "../../component/post/body";

import Story from "../../component/story";
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../../redux/fileSlice";


const HomePage = () => {


    const dispatch: any = useDispatch();
    const { data } = useSelector((state: any) => state.file)


    useEffect(() => {
        dispatch(getFiles())
    }, [])

    const onRefresh = () => {
        dispatch(getFiles())

    }


    return (

        <View
            style={styles.container}
        >
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh}
                    />
                }
                ListHeaderComponent={() => (
                    <Story />
                )}
                ListHeaderComponentStyle={styles.storyContainer}

                data={data}
                renderItem={({ item, index }) => (
                    <Post key={index} item={item} />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.postContainer}
            />
        </View>

    )
}

export default HomePage