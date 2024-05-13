import { TextInput, View } from 'react-native'
import { mainStyles } from './mainStyles'

const CustomTextInput = ({ onChangeText, placeholder, value, width = '75%', height = 40, secure = false }: any) => {

    return (
        <View style={mainStyles.container}>
            <TextInput
                secureTextEntry={secure}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={[{ width: width, height: height }, mainStyles.centerInput]}
                placeholderTextColor="#f1faee"
                value={value}
            />
        </View>
    )
}

export default CustomTextInput
