import { Pressable, StyleSheet, Text } from 'react-native'
import { mainStyles } from './mainStyles'

const CustomBtn = ({ onPress, width = '80%', height = 40, placeholder }: any) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) =>
                [
                    {
                        backgroundColor: pressed ? "#ced4da" : "#457b9d"
                    },
                    { width: width, height: height },
                    mainStyles.centerBtn
                ]}
        >
            <Text style={mainStyles.text}>{placeholder}</Text>
        </Pressable>
    )
}

export default CustomBtn

