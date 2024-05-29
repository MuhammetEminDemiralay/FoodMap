import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, Pressable, Text, TextInput, View } from 'react-native'
import { styles } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import Foundation from '@expo/vector-icons/Foundation';
import { Formik } from 'formik';
import ArrowRoute from '../../../component/arrowRoute';
import { LinearGradient } from 'expo-linear-gradient';
import PhoneInput from 'react-native-phone-input'
import { CountryPicker, CountryButton, ItemTemplateProps } from 'react-native-country-codes-picker'
import { mainStyles } from '../mainStyles';

const { width, height } = Dimensions.get("window")

const PhoneScreen = () => {

    const { params } = useRoute();
    const navigation: any = useNavigation();
    const [info, setInfo] = useState<any>();
    const phone: any = useRef();
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState<string>()

    useEffect(() => {
        setInfo(params)
        phone.current.setValue(countryCode)
    }, [countryCode])




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
                ({ handleSubmit, setFieldValue }) => (
                    <LinearGradient
                        style={mainStyles.container}
                        colors={["#96ffc5", "#0086ff", "#00fff3"]}
                    >
                        <View style={mainStyles.titleBox}>
                            <Text style={mainStyles.titleText}>Telefon numaranız</Text>
                        </View>
                        <View style={[{ height: height * .08 }, mainStyles.box]}>
                            <View style={mainStyles.inputBox}>
                                <PhoneInput
                                    ref={phone}
                                    initialValue={'7'}
                                    onChangePhoneNumber={() => {
                                        setFieldValue('phone', phone.current.getValue())
                                    }}
                                    onPressFlag={() => {
                                        setShow(true)
                                    }}
                                    autoFormat={true}
                                    flagStyle={styles.flag}
                                    textStyle={styles.phoneText}
                                />
                            </View>
                            <View style={mainStyles.iconBox}>
                                <Foundation name="telephone" size={30} color="black" />
                            </View>
                            <CountryPicker
                                lang='tr'
                                pickerButtonOnPress={({ dial_code }) => {
                                    setShow(false)
                                    setCountryCode(dial_code)
                                }}
                                show={show}
                            />
                        </View>



                        <ArrowRoute handleSubmit={handleSubmit} />
                    </LinearGradient>
                )
            }
        </Formik>
    )
}

export default PhoneScreen
