import React from 'react'
import { View, TextInput } from 'react-native'
import { styles } from './style'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const TopBox = () => {




    return (
        <View style={styles.topBox}>
            <View style={styles.searchBox}>
                <TextInput style={styles.searchInput} />
            </View>

        </View>
    )
}

export default TopBox
