import { View, Text, Alert } from "react-native"
import { styles } from "./styles"
import { CustomBtn } from "../../component"
import { useEffect } from "react";
import app, { realdb } from "../../../firebaseConfig";
import { onValue, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

const ProfilePage = () => {
    const dispatch: any = useDispatch();

    const { postDatas } = useSelector((state: any) => state.post)
    const { data } = useSelector((state: any) => state.file)
    const { userData } = useSelector((state: any) => state.user)

    const veriEkle = async () => {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        const docRef = ref(realdb, "message/" + `1`)
        await set(docRef, {
            content: "Merhaba nasılsıl güzel kız"
        })
    }

    useEffect(() => {
        const docRef = ref(realdb, "message")
        onValue(docRef, (snapShot) => {
            console.log(snapShot.val());

        })
    }, [])


    const veriCek = () => {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        Alert.alert(`${userId}`)
    }

    const takip = (value: any) => {

    }

    return (
        <View>

            <CustomBtn placeholder="çıkış yap" onPress={() => dispatch(logout())} />
            <CustomBtn placeholder="iid" onPress={() => veriCek()} />

        </View>
    )
}

export default ProfilePage