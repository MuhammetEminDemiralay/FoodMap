import { View, Text } from "react-native"
import { styles } from "./styles"
import { useEffect } from "react"
import { getAuth } from "firebase/auth"
import app from "../../../firebaseConfig"
import { useDispatch } from "react-redux"
import { getFollow } from "../../redux/followSlice"

const ChatPage = () => {

    const dispatch: any = useDispatch();


    useEffect(() => {
        dispatch(getFollow())
    }, [])




    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default ChatPage