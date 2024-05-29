import React, { useEffect, useState } from 'react'
import { Dimensions, Text, TextInput, View } from 'react-native'
import { styles } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import Foundation from '@expo/vector-icons/Foundation';

import { Formik } from 'formik';
import ArrowRoute from '../../../component/arrowRoute';
import { LinearGradient } from 'expo-linear-gradient';
import { mainStyles } from '../mainStyles';

const { width, height } = Dimensions.get("window")


const NameScreen = () => {

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
                firstName: '',
                lastName: ''
            }}
            onSubmit={(value, { resetForm }) => (
                navigation.navigate('nickName', {
                    firstName: value.firstName,
                    lastName: value.lastName,
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
                        style={mainStyles.container}
                        colors={["#96ffc5", "#0086ff", "#00fff3"]}
                    >
                        <View style={[{ height: height * 0.08 }, mainStyles.box]}>
                            <View style={mainStyles.inputBox}>
                                <TextInput
                                    style={mainStyles.inputText}
                                    placeholderTextColor='#fff'
                                    onChangeText={handleChange('firstName')}
                                    value={values.firstName}
                                />
                            </View>
                        </View>
                        <View style={[{ height: height * 0.08 }, mainStyles.box]}>

                            <View style={mainStyles.inputBox}>
                                <TextInput
                                    style={mainStyles.inputText}
                                    placeholderTextColor='#fff'
                                    onChangeText={handleChange('lastName')}
                                    value={values.lastName}
                                />
                            </View>
                        </View>
                        <ArrowRoute handleSubmit={handleSubmit} />
                    </LinearGradient>
                )
            }
        </Formik>
    )
}

export default NameScreen
