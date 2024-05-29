import React, { useEffect, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { styles } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import Foundation from '@expo/vector-icons/Foundation';

import { Formik } from 'formik';
import ArrowRoute from '../../../component/arrowRoute';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../redux/authSlice';
import { addUser, getAllUser } from '../../../redux/userSlice';
import { data } from '../../../component/followBox/data';


const ProfileImageScreen = () => {

    const { params } = useRoute();
    const navigation: any = useNavigation();
    const [info, setInfo] = useState<any>();
    const dispatch: any = useDispatch();
    const { user } = useSelector((state: any) => state.user)

    useEffect(() => {
        setInfo(params)
    }, [])


    return (
        <Formik
            initialValues={{
                profilImage: data,
            }}
            onSubmit={async (value, { }) => {
                try {
                    const resultAction = await dispatch(register({ email: info.email, password: info.password }));

                    if (register.fulfilled.match(resultAction)) {

                        await dispatch(addUser({
                            profilImage: value.profilImage,
                            nickName: info.nickName,
                            firstName: info.firstName,
                            lastName: info.lastName,
                            dateOfBirth: info.dateOfBirth,
                            phone: info.phone,
                            email: info.email,
                        }));

                    } else {
                        console.error('Register failed', resultAction.payload);
                    }

                } catch (error) {
                    throw error
                }
            }}
        >
            {
                ({ handleSubmit, handleChange, values }) => (
                    <LinearGradient
                        style={styles.container}
                        colors={["#96ffc5", "#0086ff", "#00fff3"]}
                    >
                        <Text style={styles.page}>ProfileImage</Text>
                        <View style={styles.box}>
                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder=' 0 534 622 11 84'
                                    placeholderTextColor='#fff'
                                    onChangeText={handleChange('profilImage')}
                                    value={values.profilImage}
                                />
                            </View>
                            <View style={styles.iconBox}>
                                <Foundation name="telephone" size={24} color="black" />
                            </View>
                        </View>
                        <Pressable onPress={() => handleSubmit()} style={styles.completeBtn}>
                            <Text style={styles.completeText}>complete registration</Text>
                        </Pressable>
                        <ArrowRoute />
                    </LinearGradient>
                )
            }
        </Formik>
    )
}

export default ProfileImageScreen
