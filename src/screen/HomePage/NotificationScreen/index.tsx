import React, { useEffect, useState } from "react"
import { Text, View, FlatList, Dimensions, Image, Pressable } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { styles } from "./styles"
import { FontAwesome6 } from '@expo/vector-icons/';
import { useNavigation } from "@react-navigation/native";
import { data } from "../../../component/followBox/data";
import { addToFollowerList, addToFollowedList, confirmFollowRequestStatus, sendFollowRequest, updateFollowerRequest } from "../../../redux/followSlice";
import { FollowRequest } from "../../../model/followRequest";


const { width, height } = Dimensions.get("window")
const NotificationScreen = () => {

    const { userRequests } = useSelector((state: any) => state.follow)
    const navigation = useNavigation();
    const dispatch: any = useDispatch();
    const [requestStatus, setRequestStatus] = useState();

    const refresh = () => {

    }

    const ilkIstekOnaylamaDurumu = (item: any) => {
        dispatch(confirmFollowRequestStatus(item))
        dispatch(addToFollowerList(item.key))  // takipçi listesi ne ekle
        dispatch(addToFollowedList(item.key)) // takip edilen listesi ne ekle

    }

    const karsiIstek = (item: any) => {
        dispatch(sendFollowRequest(item.key))
    }

    const cancelFollowRequest = (item: any) => {
        dispatch(updateFollowerRequest(item.key))
    }

    return (
        <View style={styles.container}>
            <View style={[{ height: height * 0.08 }, styles.headerContainer]}>
                <FontAwesome6 onPress={() => navigation.goBack()} name="arrow-left-long" size={28} color="#fff" />
                <Text style={styles.headerText}>Bildirimler</Text>
            </View>

            <FlatList
                onRefresh={refresh}
                refreshing={false}
                data={userRequests}
                renderItem={({ item, index }) => (
                    <View key={index} style={[{ width: width * 0.9, height: height * 0.1 }, styles.notificationBox]}>
                        <View style={styles.profileImageBox}>
                            <Image style={styles.profileImage} source={{ uri: data }} />
                        </View>
                        <View style={styles.optionsBox}>
                            <Text style={styles.optionText}>{item.key}</Text>
                        </View>
                        <View style={styles.followBtnBox}>
                            <Pressable
                                onPress={() => {
                                    item.value.requestStatus == false ?
                                        ilkIstekOnaylamaDurumu(item) :
                                        item.value.followTo == false ?
                                            karsiIstek(item) :
                                            cancelFollowRequest(item)
                                }}
                                style={[{ backgroundColor: item.value.requestStatus ? '#bfc0c0' : '#00cecb' }, styles.followBtn]}>
                                <Text style={styles.followBtnText}>
                                    {
                                        item.value.requestStatus == false ?
                                            <Text>Onay</Text> :
                                            item.value.followTo == false ?
                                                <Text>Takip et</Text> :
                                                item.value.standByStatus == false ?
                                                    <Text>İstek gönderildi</Text> :
                                                    <Text>Takip</Text>
                                    }
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                )
                }
            />
        </View >

    )
}

export default NotificationScreen