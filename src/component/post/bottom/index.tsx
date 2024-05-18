import React from 'react'
import { Dimensions, View, Text} from 'react-native'
import { styles } from './styles'
import { Octicons, Feather, Entypo } from '@expo/vector-icons'

const { width } = Dimensions.get("window")

const Bottom = ({postData} : any) => {


  return (
    <View style={[{ height: width * 0.35 }, styles.bottom]}>

      <View style={[{ height: width * 0.13 }, styles.icons]}>
        <View style={styles.leftIcons}>
          <Octicons name="heart" size={30} color="#fff" />
          <Feather name="message-circle" size={30} color="#fff" />
          <Entypo name="direction" size={30} color="#fff" />
        </View>
        <View style={styles.rightIcons}>
          <Feather name="box" size={30} color="#fff" />
        </View>
      </View>

      <View>
        <Text style={{color : '#fff', marginLeft : 15, fontSize : 16}}>{postData.like} beğenme</Text>
      </View>

    </View>
  )
}

export default Bottom
