import React, { useEffect, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { styles } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import Foundation from '@expo/vector-icons/Foundation';

import { Formik } from 'formik';
import ArrowRoute from '../../../component/arrowRoute';
import { LinearGradient } from 'expo-linear-gradient';


const NickNameScreen = () => {

    const { params } = useRoute();
    const navigation: any = useNavigation();
    const [info, setInfo] = useState<any>();

    useEffect(() => {
        setInfo(params)
        console.log(params);

    }, [])

    return (

        <Formik
            initialValues={{
                nickName: 'fenasi',
            }}
            onSubmit={(value, { }) => (
                navigation.navigate('profileImage', {
                    nickName: value.nickName,
                    firstName: info.firstName,
                    lastName: info.lastName,
                    dateOfBirth: info.dateOfBirth,
                    phone: info.phone,
                    email: info.email,
                    password: info.password,
                })
            )}
        >
            {
                ({ handleSubmit, handleChange, values }) => (
                    <LinearGradient
                        style={styles.container}
                        colors={["#96ffc5", "#0086ff", "#00fff3"]}
                    >
                        <Text style={styles.page}>NickName</Text>
                        <View style={styles.box}>
                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder=' 0 534 622 11 84'
                                    placeholderTextColor='#fff'
                                    onChangeText={handleChange('nickName')}
                                    value={values.nickName}
                                />
                            </View>
                            <View style={styles.iconBox}>
                                <Foundation name="telephone" size={24} color="black" />
                            </View>
                        </View> 
                        <ArrowRoute handleSubmit={handleSubmit} />
                    </LinearGradient>
                )
            }
        </Formik>
    )
}

export default NickNameScreen
