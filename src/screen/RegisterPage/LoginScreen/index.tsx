import { Dimensions, Pressable, Text, TextInput, View } from "react-native"
import { mainStyles } from "../mainStyles"
import { useDispatch } from "react-redux"
import React, { useEffect } from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { GoogleSigninButton, } from "@react-native-google-signin/google-signin"
import { LinearGradient } from "expo-linear-gradient"
import { autoLogin, googleSignin, login } from "../../../redux/authSlice"
import CustomError from "../../../component/customError"
import { MaterialCommunityIcons } from '@expo/vector-icons'

const { width, height } = Dimensions.get("window")

const LoginScreen = () => {

    const dispatch: any = useDispatch();
    const navigation: any = useNavigation();

    useEffect(() => {
        dispatch(autoLogin())
    }, [])

    return (

        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            onSubmit={(value, { resetForm }) => {
                dispatch(login(value))
            }}
            validationSchema={validation}
        >
            {
                ({ handleSubmit, handleChange, values, errors, touched, dirty }: any) => (
                    <LinearGradient
                        style={mainStyles.container}
                        colors={["#96ffc5", "#0086ff", "#00fff3"]}
                    >
                        <View style={mainStyles.titleBox}>
                            <Text style={mainStyles.titleText}>LOGİN</Text>
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
                                    errors.email && touched.email && dirty && <CustomError message={errors.email} />
                                }
                            </View>
                        </View>

                        <View style={[{ height: height * 0.08 }, mainStyles.box]}>
                            <View style={mainStyles.inputBox}>
                                <TextInput
                                    style={mainStyles.inputText}
                                    onChangeText={handleChange("password")}
                                    value={values.password}
                                    placeholder="password"
                                    secureTextEntry={true}
                                />
                                {
                                    errors.password && touched.password && dirty && <CustomError message={errors.password} />
                                }
                            </View>
                        </View>
                        <LinearGradient
                            colors={['#96d1ff', '#2952ef', '#00ffc9']}
                            start={{ x: 1, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            style={mainStyles.btnLinearGradient}
                        >
                            <Pressable onPress={handleSubmit} style={mainStyles.completeBox}>
                                <Text style={mainStyles.completeText}>SignIn</Text>
                            </Pressable>
                        </LinearGradient>
                        <View style={styles.box}>
                            <Pressable onPress={() => navigation.navigate("registerScreen")} style={styles.signUp}>
                                <Text style={styles.signUpText}>register</Text>
                                <MaterialCommunityIcons name="sign-direction" size={24} color="gray" />
                            </Pressable>
                            <GoogleSigninButton
                                color={GoogleSigninButton.Color.Light}
                                size={GoogleSigninButton.Size.Icon}
                                style={styles.googleSignIn}
                                onPress={() => dispatch(googleSignin())}
                            />
                        </View>
                    </LinearGradient>
                )
            }
        </Formik>
    )
}

export default LoginScreen

const validation = Yup.object().shape({
    email: Yup.string().email("Email formatı uygun değil",).required("Email alanı gerekli"),
    password: Yup.string().required("Password alanı zorunlu").min(6, "Password minimum 6 karakter olmalı").max(15, "Password maximum 15 karakter olabilir")
})