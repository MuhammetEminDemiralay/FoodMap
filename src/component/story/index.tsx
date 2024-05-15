import React from 'react'
import { View, FlatList, Image } from 'react-native'
import { styles } from './styles'

const Story = ({ item }: any) => {

  

  return (
    <View style={styles.container}>
      <FlatList
        data={item}
        renderItem={() => (
          <Image style={styles.image} source={{ uri: item }} />
        )}
      />
    </View>
  )
}

export default Story
