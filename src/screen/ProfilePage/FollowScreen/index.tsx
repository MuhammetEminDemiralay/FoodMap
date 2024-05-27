import React, { useState } from 'react'
import { Dimensions, FlatList, Pressable, Text, View } from 'react-native'
import { styles } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { Feather } from '@expo/vector-icons'
import { getFollowedList, getFollowerList, removeFolowedList, removeFolowerList } from '../../../redux/followSlice'

const { width, height } = Dimensions.get("window")

const FollowScreen = () => {


  const { followerList, followerSize, followedList, followedSize } = useSelector((state: any) => state.follow)
  const dispatch: any = useDispatch()
  const [option, setOption] = useState("follower")

  const getFollower = () => {
    setOption("follower")
  }

  const getFollowed = () => {
    setOption("followed")
  }

  const subscribe = () => {
    setOption("subscribe")
  }

  const refresh = () => {
    dispatch(getFollowerList())
    dispatch(getFollowedList())
  }



  return (
    <View style={styles.container}>

      <View style={styles.options}>
        <Pressable onPress={() => getFollower()} style={[{ width: width * 1 / 3, backgroundColor: option == "follower" ? 'red' : "gray" }, styles.option]}>
          <Text style={styles.optionText}>{followerSize} Takipçi</Text>
        </Pressable>
        <Pressable onPress={() => getFollowed()} style={[{ width: width * 1 / 3, backgroundColor: option == "followed" ? 'red' : "gray" }, styles.option]}>
          <Text style={styles.optionText}>{followedSize} Takip</Text>
        </Pressable>
        <Pressable onPress={() => subscribe()} style={[{ width: width * 1 / 3, backgroundColor: option == "subscribe" ? 'red' : "gray" }, styles.option]}>
          <Text style={styles.optionText}>0 Abonelik</Text>
        </Pressable>
      </View>


      <FlatList

        refreshing={false}
        onRefresh={refresh}
        data={option == "subscribe" ? null : option == 'follower' ? followerList : followedList}
        renderItem={({ item, index }) => (
          <View key={index} style={[{ width: width * 0.9 }, styles.blok]}>
            <Text>{item}</Text>
            <Feather
              onPress={() => option == 'follower'
                ? dispatch(removeFolowerList(item))
                : dispatch(removeFolowedList(item))}
              name="trash-2" size={24} color="red"
            />
          </View>
        )}
        contentContainerStyle={[{ width: width * 1 }, styles.listContainer]}
      />

    </View>
  )
}

export default FollowScreen
