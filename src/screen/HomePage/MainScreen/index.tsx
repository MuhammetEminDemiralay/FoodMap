import { View, FlatList, RefreshControl, Text, Button, Pressable } from "react-native"
import { styles } from "./styles"
import React, { useEffect, useRef, useState } from "react";
import Post from "../../../component/post/body";
import Story from "../../../component/story";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsFiles } from "../../../redux/fileSlice";
import { getFriendsPosts } from "../../../redux/postSlice";
import { getAuth } from "firebase/auth";
import app from "../../../../firebaseConfig";
import FollowBox from "../../../component/followBox";
import { getAllUser, getFriendsProfiles, getUser } from "../../../redux/userSlice";
import { AntDesign, Ionicons } from '@expo/vector-icons/';
import { useNavigation } from "@react-navigation/native";
import { getFollowerRequest } from "../../../redux/followSlice";

const MainScreen = () => {

    const { currentUser } = getAuth(app)

    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();

    const { fileFriendsDatas, friendsIds } = useSelector((state: any) => state.file)
    const { postFriendsDatas } = useSelector((state: any) => state.post)

    const [finalyData, setFinalyData] = useState<any[]>([])
    const { userData, friendsProfiles } = useSelector((state: any) => state.user)
    const [followBox, setFollowBox] = useState(false);

    const { userRequests } = useSelector((state: any) => state.follow)


    useEffect(() => {

        const fetchData = async () => {
            await dispatch(getUser())
            await dispatch(getFriendsPosts())
            await dispatch(getFriendsFiles())


        }


        // dispatch(getAllUser())   // TAKİPCİ DURUMU
        // dispatch(getFollowerRequest()) // TAKİPÇİ DURUMU

        fetchData()

    }, [currentUser?.uid])


    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getFriendsProfiles(friendsIds))
        }

        fetchData()
    }, [fileFriendsDatas])

    useEffect(() => {
        combineData()
    }, [friendsProfiles])


    const onRefresh = () => {
        dispatch(getFriendsPosts())
        dispatch(getFriendsFiles())
    }

    const combineData = () => {
        const data: any[] = [];

        postFriendsDatas.forEach((item: any) => {
            let postDocumentId = item.documentId;
            let postData = item;
            fileFriendsDatas.forEach((item: any) => {
                let friendData = friendsProfiles?.find((profile: any) => profile.userId == item.userId)

                let fileDocumentId = item.documentId;
                let fileData = item;
                if (postDocumentId == fileDocumentId) {
                    data.push({ postData: postData, fileData: fileData, userProfile: friendData })
                }
            })
        })
        setFinalyData(data)
    }

    const routeNotification = () => {
        dispatch(getFollowerRequest())
        navigation.navigate("notification");
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