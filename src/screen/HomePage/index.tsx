import { View, Text, ActivityIndicator, Button, FlatList, Appearance, ScrollView, RefreshControl, SafeAreaView } from "react-native"
import { styles } from "./styles"
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useRef, useState } from "react";
import Post from "../../component/post/body";

import Story from "../../component/story";
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../../redux/fileSlice";
import { getPosts } from "../../redux/postSlice";
import { getAuth } from "firebase/auth";
import app from "../../../firebaseConfig";


const HomePage = () => {

    const { currentUser } = getAuth(app)

    const dispatch: any = useDispatch();
    const { fileDatas } = useSelector((state: any) => state.file)
    const { postDatas } = useSelector((state: any) => state.post)
    const [finalyData, setFinalyData] = useState<any[]>([])

    useEffect(() => {
        dispatch(getFiles());
        dispatch(getPosts())
        combineData();
    }, [currentUser?.uid])

    const onRefresh = () => {
        dispatch(getFiles())
        dispatch(getPosts())
        combineData();
    }

    const combineData = () => {
        const data: any[] = [];
        postDatas.forEach((item: any) => {
            let postDocumentId = item.documentId;
            let postData = item;
            fileDatas.forEach((item: any) => {
                let fileDocumentId = item.documentId;
                let fileData = item;
                if (postDocumentId == fileDocumentId) {
                    data.push({ postData: postData, fileData: fileData })
                }
            })
        })
        setFinalyData(data)
        
        
        
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

                data={finalyData}
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