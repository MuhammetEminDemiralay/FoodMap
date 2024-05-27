import React, { useEffect, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { styles } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import Foundation from '@expo/vector-icons/Foundation';

import { Formik } from 'formik';
import ArrowRoute from '../../../component/arrowRoute';


const PhoneScreen = () => {

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
                phone: '05346221184',
            }}
            onSubmit={(value, { }) => (
                navigation.navigate('dateOfBirth', {
                    phone: value.phone,
                    email: info.email,
                    password: info.password
                })
            )}
        >
            {
                ({ handleSubmit, handleChange, values }) => (
                    <View style={styles.container}>
                        <Text style={styles.page}>Phone</Text>
                        <View style={styles.box}>
                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder=' 0 534 622 11 84'
                                    placeholderTextColor='#fff'
                                    onChangeText={handleChange('phone')}
                                    value={values.phone}
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

export default PhoneScreen
