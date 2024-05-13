import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Button, FlatList, Text, View, Image, Alert } from 'react-native'
import { mainStyles } from '../styles';
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux';

const FilterScreen = () => {

  const navigation: any = useNavigation();
  const { params }: any = useRoute();
  const [images, setImages] = useState<string[]>([]);

  


  return (
    <View>
      <Text>Filter</Text>
      <Ionicons onPress={() => navigation.navigate("location")} style={mainStyles.route} name="arrow-forward-circle" size={35} color="red" />
      {/* <FlatList
        data={images}
        renderItem={({ item, index }) => (
          <Image key={index} style={{ width: 100, height: 100 }} source={{ uri: item }} />
        )}
      /> */}
    </View>
  )
}

export default FilterScreen
