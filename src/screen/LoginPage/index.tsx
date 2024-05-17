import { Button, Pressable, Text, View } from "react-native"
import { mainStyles } from "../mainStyles"
import { CustomAuthDesign, CustomBtn, CustomTextInput } from "../../component"
import { useDispatch, useSelector } from "react-redux"
import { autoLogin, googleSignin, login } from "../../redux/authSlice"
import { useEffect } from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import { styles } from "./styles"
import CustomError from "../../component/customError"
import { useNavigation } from "@react-navigation/native"
import { GoogleSigninButton } from "@react-native-google-signin/google-signin"


const LoginPage = () => {

    const dispatch : any = useDispatch();
    const navigation : any = useNavigation();
    
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
                ({ handleSubmit, handleChange, values, errors, touched, dirty } : any) => (
                    <View style={mainStyles.container}>
                        <CustomAuthDesign />
                        <Text>Login</Text>
                        <CustomTextInput
                            onChangeText={handleChange("email")}
                            value={values.email}
                            placeholder="email"
                        />
                        {
                            errors.email && touched.email && dirty && <CustomError message={errors.email} />
                        }
                        <CustomTextInput
                            onChangeText={handleChange("password")}
                            value={values.password}
                            placeholder="password"
                            secure={true}
                        />
                        {
                            errors.password && touched.password && dirty && <CustomError message={errors.password} />
                        }
                        <CustomBtn placeholder="SignIn" onPress={handleSubmit} />
                        <CustomBtn placeholder="Register git" onPress={() => navigation.navigate("register")} />
                        <GoogleSigninButton onPress={() => dispatch(googleSignin())}/>
                    </View>
                )
            }
        </Formik>
    )
}

export default LoginPage

const validation = Yup.object().shape({
    email: Yup.string().email("Email formatı uygun değil",).required("Email alanı gerekli"),
    password: Yup.string().required("Password alanı zorunlu").min(6, "Password minimum 6 karakter olmalı").max(15, "Password maximum 15 karakter olabilir")
})