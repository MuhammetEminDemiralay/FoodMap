import React from 'react'
import { Text, View } from 'react-native'
import { mainStyles } from './mainStyles'

const CustomError = ({ message }: any) => {
    return <Text style={mainStyles.errorMessage}>{message}</Text>
}

export default CustomError
