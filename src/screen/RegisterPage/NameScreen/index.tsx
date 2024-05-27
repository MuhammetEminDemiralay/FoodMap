import React, { useEffect, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { styles } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import Foundation from '@expo/vector-icons/Foundation';

import { Formik } from 'formik';
import ArrowRoute from '../../../component/arrowRoute';


const NameScreen = () => {

    const { params } = useRoute();
    const navigation: any = useNavigation();
    const [info, setInfo] = useState<any>();
    const nextScreen = 'dateOfBirth';

    useEffect(() => {
        setInfo(params)
        console.log(params);
        
    }, [])

    return (

        <Formik
            initialValues={{
                firstName: 'Muhammet',
                lastName: 'Demiralay'
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
                    <View style={styles.container}>
                        <Text style={styles.page}>Name</Text>
                        <View style={styles.box}>
                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder='Muhammet'
                                    placeholderTextColor='#fff'
                                    onChangeText={handleChange('firstName')}
                                    value={values.firstName}
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder='Demiralay'
                                    placeholderTextColor='#fff'
                                    onChangeText={handleChange('lastName')}
                                    value={values.lastName}
                                />
                            </View>
                        </View>
                        <ArrowRoute handleSubmit={handleSubmit} />
                    </View>
                )
            }
        </Formik>
    )
}

export default NameScreen
