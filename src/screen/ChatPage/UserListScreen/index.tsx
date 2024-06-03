import { View, Text, TextInput, Pressable, FlatList, Dimensions } from "react-native"
import { styles } from "./styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowedList, getFollowerList } from "../../../redux/followSlice";
import { getSearchFriends } from "../../../redux/userSlice";
import Feather from '@expo/vector-icons/Feather';
import UserBox from "../../../component/userBox";
import { MaterialCommunityIcons } from '@expo/vector-icons';


const { width, height } = Dimensions.get("window")

const UserListScreen = () => {



    const dispatch: any = useDispatch();
    const { followerList, followedList } = useSelector((state: any) => state.follow)
    const [filter, setFilter] = useState<string>("")

    const { searchFriendProfile } = useSelector((state: any) => state.user)


    useEffect(() => {
        dispatch(getFollowerList())
        dispatch(getFollowedList())

    }, [])

    const get = async (value: any) => {
        await dispatch(getSearchFriends(value))
    }


    return (

        <View style={styles.container}>

            <View style={styles.searchBox}>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={(value) => get(value)}
                />
                <View style={styles.iconBox}>
                    <MaterialCommunityIcons name="account-search" size={30} color="black" />
                </View>
            </View>

            <FlatList
                data={searchFriendProfile}
                renderItem={({ item, index }) => (
                    <View style={[{ height: width * 0.20 }, styles.profileBox]}>
                        <UserBox item={item} key={index} />
                    </View>
                )}
                contentContainerStyle={[{ minWidth: width * 0.9 }, styles.profileListBox]}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default UserListScreen