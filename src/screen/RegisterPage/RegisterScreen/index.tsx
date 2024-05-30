import { View, Text, Button, TextInput, Dimensions } from "react-native"
import { styles } from "./styles"
import { mainStyles } from "../mainStyles"
import { CustomAuthDesign, CustomBtn, CustomTextInput } from "../../../component"
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from "react"
import { Field, Formik, FieldProps } from "formik"
import * as Yup from 'yup'
import CustomError from "../../../component/customError"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import ArrowRoute from "../../../component/arrowRoute"

const { width, height } = Dimensions.get('window')

const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { error } = useSelector((state: any) => state.user);
    const { user } = useSelector((state: any) => state.auth);
    const navigation: any = useNavigation();

    useEffect(() => {

    }, [error])

    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            onSubmit={(value, { }) => {
                navigation.navigate('phone', { email: value.email, password: value.password })
            }}
            validationSchema={validation}
        >
            {
                ({ handleSubmit, handleChange, values, errors, touched, dirty, validateField, isValid }) => (
                    <LinearGradient
                        style={mainStyles.container}
                        colors={["#96ffc5", "#0086ff", "#00fff3"]}
                    >
                        <View style={mainStyles.titleBox}>
                            <Text style={mainStyles.titleText}>REGİSTER</Text>
                        </View>
                        <View style={[{ height: height * 0.08 }, mainStyles.box]}>
                            <View style={mainStyles.inputBox}>
                                <TextInput
                                    style={mainStyles.inputText}
                                    onChangeText={handleChange("email")}
                                    value={values.email}
                                    placeholder="email"
                                />
                                {
                                    errors.email && dirty && touched.email && <CustomError message={errors.email} />
                                }
                            </View>
                        </View>
                        <View style={[{ height: height * 0.08}, mainStyles.box]}>
                            <View style={mainStyles.inputBox}>
                                <TextInput
                                    style={mainStyles.inputText}
                                    onChangeText={handleChange("password")}
                                    value={values.password}
                                    placeholder="password"
                                    secureTextEntry={true}
                                    onPressIn={() => validateField('password')}
                                />
                                {
                                    errors.password && dirty && touched.password && <CustomError message={errors.password} />
                                }
                            </View>
                        </View>


                        <ArrowRoute handleSubmit={handleSubmit} isValid={isValid} dirty={dirty} />

                    </LinearGradient>
                )
            }
        </Formik>
    )
}

export default RegisterScreen


const validation = Yup.object().shape({
    email: Yup.string().email("Email formatına uygun değil").required("Email alanı zorunlu"),
    password: Yup.string().required("Password alanı gerekli").min(6, "Minimum 6 karakter olmalı").max(15, "Maximium 15 karakter olabilir")
})
