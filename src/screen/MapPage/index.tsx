import { View, Dimensions, Text, FlatList, Button } from "react-native"
import { styles } from "./styles"
import { useDispatch, useSelector } from "react-redux"
import { CustomBtn } from "../../component"
import { logout } from "../../redux/authSlice"
import { getFiles } from "../../redux/fileSlice"
import { onValue, ref, set } from "firebase/database"
import app, { realdb } from "../../../firebaseConfig"
import { getAuth } from "firebase/auth"
import { useEffect } from "react"
import { getAllUser } from "../../redux/userSlice"
import { followUser } from "../../redux/followSlice"

const { width, height } = Dimensions.get('window')

const MapPage = () => {

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

    }

    const takip = (value : any) => {
        
    }


    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.container}>

                <CustomBtn placeholder="çıkış yap" onPress={() => dispatch(logout())} />

                <CustomBtn placeholder="Veri ekle" onPress={() => veriEkle()} />

                <CustomBtn placeholder="Veri çek" onPress={() => veriCek()} />

            
                <CustomBtn placeholder="Alan kas" onPress={() => dispatch(followUser({recieverId : "2", senderId : "1"}))} />


            </View>
        </View>
    )
}

export default MapPage