import { View, Text, Alert, FlatList, Image, Dimensions, Pressable, Button, ActivityIndicator } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { addUserProfile, getUserPostImage, imageAdd, imageDelete, profileAdd } from '../../redux/fileSlice'
import { styles } from "./style";


const { width, height } = Dimensions.get("window")

const ProfileBox = ({
    currentUser,
    profileImageEditActive,
    setProfileImageEditActive,
    openCamera,
    openLibrary,
    followerSize,
    followedSize,
    userPostImages,
    newData,
    refresh
}: any) => {

    const navigation: any = useNavigation();

    return (
        <FlatList
            ListHeaderComponent={() => (
                <LinearGradient
                    colors={["#96ffc5", "#0086ff", "#00fff3"]}
                >

                    <Ionicons onPress={() => navigation.navigate('settings')} style={styles.settings} name="settings-sharp" size={28} color="black" />
                    <View style={styles.topBox}>
                        {
                            profileImageEditActive &&
                            <Ionicons onPress={() => openCamera()} name="camera" size={32} color="#fff" />
                        }
                        <Pressable onPress={() => setProfileImageEditActive(profileImageEditActive ? false : true)} style={styles.profileImageBox}>
                            {
                                currentUser?.profileImage &&
                                <Image style={styles.image} source={{ uri: currentUser?.profileImage }} />
                            }
                        </Pressable>
                        {
                            profileImageEditActive &&
                            <FontAwesome onPress={() => openLibrary()} name="photo" size={32} color="#fff" />
                        }

                    </View>


                    <View style={styles.bottomBox}>

                        <View style={styles.nameBox}>
                            <Text style={styles.nameText}>{currentUser?.userData?.userInfo?.firstName} </Text>
                            <Text style={styles.nameText}>{currentUser?.userData?.userInfo?.lastName}</Text>
                        </View>
                        <View style={styles.followOptions}>
                            <View style={[{ width: width * 1 / 3 }, styles.options]}>
                                <Pressable style={styles.option}>
                                    <Text style={styles.optionText}>{userPostImages?.length}</Text>
                                    <Text style={styles.optionText}>gönderi</Text>
                                </Pressable>
                            </View>
                            <View style={[{ width: width * 1 / 3 }, styles.options]}>
                                <Pressable onPress={() => navigation.navigate("followScreen", "follower")} style={styles.option}>
                                    <Text style={styles.optionText}>{followerSize}</Text>
                                    <Text style={styles.optionText}>takipçi</Text>
                                </Pressable>
                            </View>
                            <View style={[{ width: width * 1 / 3 }, styles.options]}>
                                <Pressable onPress={() => navigation.navigate("followScreen", "followed")} style={styles.option}>
                                    <Text style={styles.optionText}>{followedSize}</Text>
                                    <Text style={styles.optionText}>takip</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

            )}

            ListHeaderComponentStyle={[{ width: width * 1, height: height * 1 / 2 }, styles.headerContainer]}

            data={newData}

            renderItem={({ item }) => (

                <View style={[{ width: width * 1 / 3, height: width * 1 / 3 }, styles.post]}>

                    {
                        item &&
                        <Pressable onPress={() => navigation.navigate('postDetail', item)}>
                            <Image style={styles.postImage} source={{ uri: item?.fileData?.fileUrl[0] }} />
                        </Pressable>
                    }

                </View>

            )}
            contentContainerStyle={[styles.container]}

            numColumns={3}
            showsVerticalScrollIndicator={false}
            refreshing={false}
            onRefresh={refresh}
        />
    )
}

export default ProfileBox
