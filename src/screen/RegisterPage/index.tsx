import { View, Text, Button, TextInput } from "react-native"
import { styles } from "./styles"
import { mainStyles } from "../mainStyles"
import { CustomAuthDesign, CustomBtn, CustomTextInput } from "../../component"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../../redux/authSlice"
import { useEffect } from "react"
import { Formik } from "formik"
import * as Yup from 'yup'
import CustomError from "../../component/customError"
import { useNavigation } from "@react-navigation/native"


const RegisterPage = () => {

    const dispatch = useDispatch();
    const { error } = useSelector((state: any) => state.user);
    const navigation = useNavigation();

    useEffect(() => {
        console.log(error);
    }, [error])

    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            onSubmit={(value, { resetForm }) => {
                console.log(value);

                dispatch(register(value))
            }}
            validationSchema={validation}
        >
            {
                ({ handleSubmit, handleChange, values, errors, touched, dirty } : any) => (
                    <View style={mainStyles.container}>
                        <CustomAuthDesign />
                        <Text>REGİSTER</Text>
                        <CustomTextInput
                            onChangeText={handleChange("email")}
                            value={values.email}
                            placeholder="email"
                        />
                        {
                            errors.email && dirty && touched.email && <CustomError message={errors.email} />
                        }
                        <CustomTextInput
                            onChangeText={handleChange("password")}
                            value={values.password}
                            placeholder="password"
                            secure={true}
                        />
                        {
                            errors.password && dirty && touched.password && <CustomError message={errors.password} />
                        }
                        <CustomBtn onPress={handleSubmit} placeholder="SignUp" />
                        <CustomBtn placeholder="logine dön" onPress={() => navigation.goBack()} />
                    </View>
                )
            }
        </Formik>
    )
}

export default RegisterPage


const validation = Yup.object().shape({
    email: Yup.string().email("Email formatına uygun değil").required("Email alanı zorunlu"),
    password: Yup.string().required("Password alanı gerekli").min(6, "Minimum 6 karakter olmalı").max(15, "Maximium 15 karakter olabilir")
})
