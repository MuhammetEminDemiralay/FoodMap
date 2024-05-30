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
                nickName: '',
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
                        style={mainStyles.container}
                        colors={["#96ffc5", "#0086ff", "#00fff3"]}
                    >
                        <View style={mainStyles.titleBox}>
                            <Text style={mainStyles.titleText}>Takma ad</Text>
                        </View>
                        <View style={[{ height: height * 0.08 }, mainStyles.box]}>
                            <View style={mainStyles.inputBox}>
                                <TextInput
                                    style={mainStyles.inputText}
                                    onChangeText={handleChange('nickName')}
                                    value={values.nickName}
                                />
                            </View>
                            <View style={mainStyles.iconBox}>
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
