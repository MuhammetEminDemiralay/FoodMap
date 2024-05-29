import React, { useEffect, useState } from 'react'
import { Dimensions, Pressable, Text, TextInput, View } from 'react-native'
import { styles } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Formik } from 'formik';
import ArrowRoute from '../../../component/arrowRoute';
import { LinearGradient } from 'expo-linear-gradient';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { mainStyles } from '../mainStyles';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const { width, height } = Dimensions.get("window")

const DateOfBirthScreen = () => {


    const { params } = useRoute();
    const navigation: any = useNavigation();
    const [info, setInfo] = useState<any>();
    const [dateOfBirth, setDateOfBirth] = useState<any>();
    const [realDate, setRealDate] = useState<any>()

    useEffect(() => {
        setInfo(params)
    }, [])

    const calendarOn = () => {
        DateTimePickerAndroid.open({
            value: new Date(),
            onChange: (event: DateTimePickerEvent, date) => {

                let year = date?.getFullYear();
                let month = date?.getMonth();
                let day = date?.getDate();

                if (month != undefined) {
                    month += 1
                }

                const dateFormat = `${(day != undefined && day < 10 ? `0${day}` : day)}.${(month != undefined && month < 10 ? `0${month}` : month)}.${year}`

                setRealDate(date)
                setDateOfBirth(dateFormat)
            },
            mode: 'date',
        })
    }



    return (

        <Formik
            initialValues={{
                dateOfBirth: realDate,
            }}
            onSubmit={(value, { }) => (
                navigation.navigate('name', {
                    dateOfBirth: `${realDate}`,
                    phone: info.phone,
                    email: info.email,
                    password: info.password,
                })

            )}
        >
            {
                ({ handleSubmit, handleChange, values, setFieldValue }) => (
                    <LinearGradient
                        style={mainStyles.container}
                        colors={["#96ffc5", "#0086ff", "#00fff3"]}
                    >
                        <View style={mainStyles.titleBox}>
                            <Text style={mainStyles.titleText}>Doğum tarihiniz</Text>
                        </View>
                        <View style={[{ height: height * 0.08 }, mainStyles.box]}>
                            <View style={mainStyles.inputBox}>
                                <TextInput
                                    style={mainStyles.inputText}
                                    value={dateOfBirth}
                                />
                            </View>
                            <View style={mainStyles.iconBox}>
                                <FontAwesome onPress={() => calendarOn()} name="calendar-plus-o" size={30} color="black" />
                            </View>
                        </View>
                        <ArrowRoute handleSubmit={handleSubmit} />
                    </LinearGradient>
                )
            }
        </Formik>
    )
}

export default DateOfBirthScreen
