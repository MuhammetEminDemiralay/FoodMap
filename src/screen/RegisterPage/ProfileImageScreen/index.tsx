import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Pressable, Text, View } from 'react-native'
import { styles } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Formik } from 'formik';
import ArrowRoute from '../../../component/arrowRoute';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../redux/authSlice';
import { addUser } from '../../../redux/userSlice';
import { data } from '../../../component/followBox/data';
import { mainStyles } from '../mainStyles';
import * as ImagePicker from 'expo-image-picker'
import { addUserProfile, profileAdd } from '../../../redux/fileSlice';
import { Ionicons, FontAwesome } from '@expo/vector-icons';


const { width, height } = Dimensions.get("window")

const ProfileImageScreen = () => {

    const { params } = useRoute();
    const navigation: any = useNavigation();
    const [info, setInfo] = useState<any>();
    const dispatch: any = useDispatch();
    const { user } = useSelector((state: any) => state.user);
    const { userProfile } = useSelector((state: any) => state.file)
    const lastScreen = 'lastScreen'
    useEffect(() => {
        setInfo(params)
    }, [])

    const openLibrary = async () => {
        const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
            selectionLimit: 1,
            aspect: [1, 1],
            allowsEditing: true
        })
        if (!canceled) {
            dispatch(profileAdd(assets[0].uri))
        }
    }

    const openCamera = async () => {
        const { assets, canceled } = await ImagePicker.launchCameraAsync({
            selectionLimit: 1,
            aspect: [1, 1],
            allowsEditing: true
        })
        if (!canceled) {
            dispatch(profileAdd(assets[0].uri))
        }
    }


    return (
        <Formik
            initialValues={{
                profilImage: data,
            }}
            onSubmit={async (value, { }) => {
                try {
                    const resultAction = await dispatch(register({ email: info.email, password: info.password }));
                    console.log(resultAction);

                    if (register.fulfilled.match(resultAction)) {

                        await dispatch(addUser({
                            nickName: info.nickName,
                            firstName: info.firstName,
                            lastName: info.lastName,
                            dateOfBirth: info.dateOfBirth,
                            phone: info.phone,
                            email: info.email,
                        }));

                        await dispatch(addUserProfile(null))


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
                        style={mainStyles.container}
                        colors={["#96ffc5", "#0086ff", "#00fff3"]}
                    >
                        <View style={[{ width: width * 0.7, height: width * 0.7 }, styles.profileImageBox]}>
                            <Image
                                style={styles.profileImage}
                                source={userProfile == null ? require('./noProfileImage.png') : { uri: userProfile }}
                            />
                        </View>
                        <View style={styles.options}>
                            <Ionicons onPress={() => openCamera()} name="camera" size={38} color="#fff" />
                            <FontAwesome onPress={() => openLibrary()} name="photo" size={32} color="#fff" />
                        </View>
                        <LinearGradient
                            colors={['#96d1ff', '#2952ef', '#00ffc9']}
                            start={{ x: 1, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            style={mainStyles.btnLinearGradient}
                        >
                            <Pressable onPress={() => userProfile != null && handleSubmit()} style={mainStyles.completeBox}>
                                <Text style={mainStyles.completeText}>Kaydı Tamamla</Text>
                            </Pressable>
                        </LinearGradient>
                        <ArrowRoute lastScreen={lastScreen} />
                    </LinearGradient>
                )
            }
        </Formik>
    )
}

export default ProfileImageScreen
