import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { styles } from './styles'
import { useRoute } from '@react-navigation/native'
import Post from '../../../component/post/body'
import { useSelector } from 'react-redux'

const PostDetailScreen = () => {

    const { params } = useRoute();
    const { currentUser } = useSelector((state: any) => state.user)

    useEffect(() => {
       

    }, [])

    return (
        <View style={styles.container}>
            <Post item={params} currentUser={currentUser} />
        </View>
    )
}

export default PostDetailScreen
