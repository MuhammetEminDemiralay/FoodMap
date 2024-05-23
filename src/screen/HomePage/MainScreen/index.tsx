import { View, FlatList, RefreshControl, Text, Button, Pressable } from "react-native"
import { styles } from "./styles"
import { useEffect, useRef, useState } from "react";
import Post from "../../../component/post/body";
import Story from "../../../component/story";
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../../../redux/fileSlice";
import { getPosts } from "../../../redux/postSlice";
import { getAuth } from "firebase/auth";
import app from "../../../../firebaseConfig";
import FollowBox from "../../../component/followBox";
import { getAllUser } from "../../../redux/userSlice";
import { AntDesign, Ionicons } from '@expo/vector-icons/';
import { useNavigation } from "@react-navigation/native";
import { getFollowerRequest } from "../../../redux/followSlice";


const MainScreen = () => {

    const { currentUser } = getAuth(app)
    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();
    const { fileDatas } = useSelector((state: any) => state.file)
    const { postDatas } = useSelector((state: any) => state.post)
    const [finalyData, setFinalyData] = useState<any[]>([])
    const { userData } = useSelector((state: any) => state.user)
    const [followBox, setFollowBox] = useState(false);

    const { userRequests } = useSelector((state: any) => state.follow)

    useEffect(() => {

        dispatch(getFiles());
        dispatch(getPosts())
        dispatch(getAllUser())
        dispatch(getFollowerRequest())
        combineData();

    }, [currentUser?.uid, dispatch])


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

    const routeNotification = () => {
        dispatch(getFollowerRequest())
        navigation.navigate("notification");
    }

    const çekBakalım = () => {
        console.log(userRequests);

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
                    <View style={styles.topContainer}>
                        <View style={styles.topBox}>
                            <Button title="tıkla" onPress={() => çekBakalım()} />
                            <Ionicons onPress={() => routeNotification()} style={styles.notificationIcon} name="notifications-outline" size={26} color="#fff" />
                            <AntDesign onPress={() => navigation.navigate('message')} style={styles.messageIcon} name="message1" size={24} color="#fff" />
                        </View>
                        <Story />
                        <FollowBox userData={userData} followBox={followBox} setFollowBox={setFollowBox} />
                    </View>
                )}

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

export default MainScreen