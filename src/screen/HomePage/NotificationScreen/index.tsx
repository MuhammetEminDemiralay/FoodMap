import { Text, View } from "react-native"
import { styles } from "./styles"
import { useEffect } from "react"
import { onValue } from "firebase/database"
import { useDispatch } from "react-redux"
import { getFollow } from "../../../redux/followSlice"

const NotificationScreen = () => {


    return (

        <View>
            <Text>Notification page</Text>
        </View>

    )
}

export default NotificationScreen