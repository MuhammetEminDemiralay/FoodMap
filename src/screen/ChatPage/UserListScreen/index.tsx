import { View, Text } from "react-native"
import { styles } from "./styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowedList, getFollowerList } from "../../../redux/followSlice";


const UserListScreen = () => {



    const dispatch: any = useDispatch();
    const { followerList, followedList } = useSelector((state: any) => state.follow)

    useEffect(() => {
        dispatch(getFollowerList())
        dispatch(getFollowedList())

    }, [])


    return (


        <View style={styles.container}>
            <Text></Text>
        </View>
    )
}

export default UserListScreen