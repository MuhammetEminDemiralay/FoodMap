import { View, Text, Alert, FlatList, Image, Dimensions, Pressable, Button, ActivityIndicator } from "react-native"
import { data } from "../../../component/followBox/data";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getFollowerList, getFollowedList } from "../../../redux/followSlice";
import React, { useEffect, useState } from "react";
import { getUser } from "../../../redux/userSlice";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { addUserProfile, getUserPostImage, imageAdd, imageDelete, profileAdd } from '../../../redux/fileSlice'
import { getUserPost } from "../../../redux/postSlice";
import ProfileBox from "../../../component/profile";


const { width, height } = Dimensions.get("window")

const ProfileScreen = () => {

    const dispatch: any = useDispatch();
    const navigation: any = useNavigation();

    const { followerSize, followedSize } = useSelector((state: any) => state.follow)

    const { currentUser } = useSelector((state: any) => state.user)
    const { userPosts } = useSelector((state: any) => state.post)
    const { userPostImages, userPostState } = useSelector((state: any) => state.file)

    const [newData, setNewData] = useState<any>([])
    const [profileImageEditActive, setProfileImageEditActive] = useState(false);

    const openCamera = async () => {
        const { assets, canceled } = await ImagePicker.launchCameraAsync({
            aspect: [1, 1],
            selectionLimit: 1,
            allowsEditing: true
        })
        if (!canceled) {
            dispatch(profileAdd(assets[0].uri))
            dispatch(addUserProfile(assets[0].uri))
        }
    }
    const openLibrary = async () => {
        const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
            aspect: [1, 1],
            selectionLimit: 1,
            allowsEditing: true
        })
        if (!canceled) {
            dispatch(profileAdd(assets[0].uri))
            dispatch(addUserProfile(assets[0].uri))
        }
    }


    useEffect(() => {

        const fetchData = async () => {
            setNewData([])

            await dispatch(getFollowerList());
            await dispatch(getFollowedList());

            await dispatch(getUser());
            await dispatch(getUserPostImage());
            await dispatch(getUserPost());
        };

        fetchData();

    }, [followedSize, followerSize]);

    useEffect(() => {
        let data: any[] = []
        userPosts?.post?.forEach((post: any) => {
            const fileData = userPostImages?.find((postImage: any) => postImage.documentId == post.documentId)
            data.push({ postData: post, fileData: fileData })
        })
        setNewData(data)

    }, [userPostImages]);

    const refresh = () => {
        dispatch(getFollowerList())
        dispatch(getFollowedList())
        dispatch(getUser())
    }

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <ProfileBox
                currentUser={currentUser}
                profileImageEditActive={profileImageEditActive}
                setProfileImageEditActive={setProfileImageEditActive}
                openCamera={openCamera}
                openLibrary={openLibrary}
                followerSize={followerSize}
                followedSize={followedSize}
                userPostImages={userPostImages}
                newData={newData}
                refresh={refresh}
            />

        </View>

    )
}

export default ProfileScreen