import { useEffect, useState } from "react"
import { Text, View, FlatList, Dimensions, Image, Pressable } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { styles } from "./styles"
import { FontAwesome6 } from '@expo/vector-icons/';
import { useNavigation } from "@react-navigation/native";
import { data } from "../../../component/followBox/data";
import { addToFollowerList, addToFollowingList, sendFollowRequest, updateFollowRequest } from "../../../redux/followSlice";
import { FollowRequest } from "../../../model/followRequest";


const { width, height } = Dimensions.get("window")
const NotificationScreen = () => {

    const { userRequests } = useSelector((state: any) => state.follow)
    const navigation = useNavigation();
    const dispatch: any = useDispatch();
    const [requestStatus, setRequestStatus] = useState();

    const refresh = () => {

    }

    const confirmFollowRequest = (item: any) => {

        dispatch(addToFollowerList(item.key))
        dispatch(addToFollowingList(item.key))
        dispatch(updateFollowRequest(item))

    }

    const sendFollowUpRequest = (item: any) => {
        dispatch(sendFollowRequest(item.key))
        // followTo yu güncelle
    }

    const cancelFollowRequest = (item: any) => {
        //followTo yu güncelle
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
                                    item.value.requestStatues == false ?
                                        confirmFollowRequest(item) :
                                        item.value.followTo == false ?
                                            sendFollowUpRequest(item) :
                                            cancelFollowRequest(item)
                                }}
                                style={styles.followBtn}>
                                <Text style={styles.followBtnText}>
                                    {
                                        item.value.requestStatues == false ?
                                            <Text>Onay</Text> :
                                            <Text>Sen de takip et</Text>
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