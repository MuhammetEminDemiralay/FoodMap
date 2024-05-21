import { View, Dimensions, Text, FlatList, Button, Alert } from "react-native"
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
import { followUser, listFollowWatchState } from "../../redux/followSlice"
import MapView from "react-native-maps"
import TopBox from "../../component/topBox"

const { width, height } = Dimensions.get('window')

const MapPage = () => {

    const dispatch: any = useDispatch();

    return (
        <View style={styles.container}>
            <TopBox />
            <MapView
                style={styles.mapContainer}
            >

            </MapView>


        </View>
    )
}

export default MapPage