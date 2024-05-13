import { useNavigation } from '@react-navigation/native'
import { styles } from './styles'
import { mainStyles } from '../styles'
import React from 'react'
import { Dimensions, Image, SafeAreaView, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Octicons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { imageAdd, imageDelete } from '../../../redux/fileSlice'

const { width, height } = Dimensions.get("window")
const Camera = () => {


  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const { files } = useSelector((state: any) => state.file)

  const cameraOperation = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled) {
      dispatch(imageAdd(result.assets[0].uri))
    }
  }


  const galeryOperation = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      allowsMultipleSelection: true,
      selectionLimit: 10,
      orderedSelection: true
    });
    if (!result.canceled) {
      result.assets.forEach((item, index) => {
        dispatch(imageAdd(item.uri))
      })
    }
  }

  const remove = (item: string) => {
    dispatch(imageDelete(item))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fileContainer}>
        <Ionicons onPress={() => navigation.navigate("filter")} style={mainStyles.route} name="arrow-forward-circle" size={35} color="red" />
        <Image style={styles.file} source={files.length < 1 ? require('./noFile.jpg') : { uri: files[0] }} />
      </View>
      <View style={styles.fileBar}>
        <Octicons onPress={() => cameraOperation()} name="device-camera" size={40} color="white" />
        <FontAwesome onPress={() => galeryOperation()} name="image" size={36} color="white" />
      </View>
      <View style={styles.selectedFilesContainer}
      >
        {
          files &&
          files.map((item: string, index: number) => (
            <View style={[{ width: width * 1 / 3 }, styles.imageWrapper]}>
              <Ionicons onPress={() => remove(item)} style={styles.imageDelete} name="close-circle-sharp" size={24} color="red" />
              <Image source={{ uri: item }} style={styles.image} />
            </View>
          ))
        }
      </View>
    </SafeAreaView>
  )
}

export default Camera
