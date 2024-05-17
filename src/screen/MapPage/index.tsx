import { View, Text, FlatList, Image, Dimensions, RefreshControl, Button, Pressable } from "react-native"
import { styles } from "./styles"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CustomBtn } from "../../component"
import { addData, logout, deleteData} from "../../redux/authSlice"
import { addPost, getPost, getPosts } from "../../redux/postSlice"
import { addUser, updateUser } from "../../redux/userSlice"


const { width, height } = Dimensions.get('window')

const MapPage = () => {

    const dispatch : any = useDispatch();



    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.container}>
                
                <CustomBtn placeholder="çıkış yap" onPress={() => dispatch(logout())} />
                <CustomBtn placeholder="VERİ EKLE" onPress={() => dispatch(addData())} />
                <CustomBtn placeholder="Veri SİL" onPress={() => dispatch(deleteData())} />

                <CustomBtn placeholder="Kullanıcıyı ekle" onPress={() => dispatch(addUser())} />

                <CustomBtn placeholder="Kullanıcıyı Güncelle" onPress={() => dispatch(updateUser())} />


                <CustomBtn placeholder="Arkadaşların verileri" onPress={() => dispatch(getPosts())} />

            </View>
        </View>
    )
}

export default MapPage