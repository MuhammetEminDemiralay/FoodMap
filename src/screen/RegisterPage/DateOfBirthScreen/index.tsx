import React, { useEffect, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { styles } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import Foundation from '@expo/vector-icons/Foundation';

import { Formik } from 'formik';
import ArrowRoute from '../../../component/arrowRoute';


const DateOfBirthScreen = () => {

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
                dateOfBirth: '30.04.1999',
            }}
            onSubmit={(value, { }) => (
                navigation.navigate('name', {
                    dateOfBirth: value.dateOfBirth,
                    phone: info.phone,
                    email: info.email,
                    password: info.password,
                })
            )}
        >
            {
                ({ handleSubmit, handleChange, values }) => (
                    <View style={styles.container}>
                        <Text style={styles.page}>Date of birth</Text>

                        <View style={styles.box}>
                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder=' 30.04.1999'
                                    placeholderTextColor='#fff'
                                    onChangeText={handleChange('dateOfBirth')}
                                    value={values.dateOfBirth}
                                />
                            </View>
                            <View style={styles.iconBox}>
                                <Foundation name="telephone" size={24} color="black" />
                            </View>
                        </View>
                        <ArrowRoute handleSubmit={handleSubmit} />
                    </View>
                )
            }
        </Formik>
    )
}

export default DateOfBirthScreen
