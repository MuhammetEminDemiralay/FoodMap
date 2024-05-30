import React from 'react'
import { View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

const ArrowRoute = ({ handleSubmit, lastScreen, isValid, dirty }: any) => {


    const navigation: any = useNavigation();



    return (
        <View style={styles.container}>
            <MaterialCommunityIcons onPress={() => navigation.goBack()} name="arrow-left-bold-circle" size={40} color="black" />
            {
                lastScreen != 'lastScreen' &&
                <MaterialCommunityIcons onPress={handleSubmit} name="arrow-right-bold-circle" size={40} color='black' />
            }
        </View>
    )
}

export default ArrowRoute
