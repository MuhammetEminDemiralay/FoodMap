import { View, Text, FlatList, Image, Dimensions, RefreshControl, Button, Pressable } from "react-native"
import { styles } from "./styles"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CustomBtn } from "../../component"
import { addData, logout, deleteData } from "../../redux/authSlice"
import { addPost, getPost, getPosts } from "../../redux/postSlice"
import { addUser, updateUser } from "../../redux/userSlice"
import { getFiles } from "../../redux/fileSlice"


const { width, height } = Dimensions.get('window')

const MapPage = () => {

    const dispatch: any = useDispatch();

    const { postDatas } = useSelector((state: any) => state.post)
    const { data } = useSelector((state: any) => state.file)


    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.container}>

                <CustomBtn placeholder="çıkış yap" onPress={() => dispatch(logout())} />

                <CustomBtn placeholder="çek" onPress={() => dispatch(getFiles())} />

            </View>
        </View>
    )
}

export default MapPage