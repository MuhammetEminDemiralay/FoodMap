import { View, Text, Alert, FlatList } from "react-native"
import { styles } from "./styles"
import { CustomBtn } from "../../component"
import { useEffect } from "react";
import app, { realdb } from "../../../firebaseConfig";
import { onValue, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { getFollow } from "../../redux/followSlice";

const ProfilePage = () => {
    const dispatch: any = useDispatch();

    const { postDatas } = useSelector((state: any) => state.post)
    const { data } = useSelector((state: any) => state.file)
    const { userData } = useSelector((state: any) => state.user)
    const { userRequests } = useSelector((state: any) => state.follow)



    const iid = () => {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        Alert.alert(`${userId}`)
    }



    return (
        <View>

            <CustomBtn placeholder="çıkış yap" onPress={() => dispatch(logout())} />
            <CustomBtn placeholder="iid" onPress={() => iid()} />


            <View style={{ width: '100%', height: 300, borderWidth: 1, backgroundColor: "red" }}>
                
            </View>

        </View>
    )
}

export default ProfilePage