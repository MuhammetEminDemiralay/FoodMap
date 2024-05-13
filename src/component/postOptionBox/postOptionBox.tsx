import React from 'react'
import { Pressable, View, Text } from 'react-native'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { styles } from './styles'
import { db } from '../../../firebaseConfig'
import { useDispatch } from 'react-redux'
import { addPost } from '../../redux/postSlice'

const PostOptionBox = ({ handlePost, selectedOption, selectedLocationChange, markedLocation }: any) => {




    return (
        <View style={styles.optionContainer}>
            <View style={styles.topBox}>
                <Pressable style={styles.changeOptionBox} onPress={selectedLocationChange}>
                    <Text style={styles.changeOptionText}>
                        {selectedOption == "currentLocation" && markedLocation == null ? "Mevcut konumu kullan" : "Harita üzerinden seç"}
                    </Text>
                    <Ionicons style={styles.changeOptionIcon} name="reload-circle" size={30} color="black" />
                </Pressable>
            </View>

            <View style={styles.bottomBox}>
                <View style={styles.options}>

                </View>
                <Pressable style={styles.sendPost} onPress={() => handlePost()}>
                    <FontAwesome5 name="check" size={24} color="#000814" />
                </Pressable>
            </View>
        </View>
    )
}

export default PostOptionBox
