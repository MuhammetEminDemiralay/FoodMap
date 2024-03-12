import React, { useState } from 'react'
import { styles } from './styles'
import { Text, View, Button, Pressable, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/userSlice'

interface LoginInfo {
  email : string,
  password : string
}

const LoginPage = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Email</Text>
        <TextInput onChangeText={(email) => setEmail(email)} style={styles.textInput} placeholder='email' />
      </View>
      <View>
        <Text style={styles.text}>Password</Text>
        <TextInput onChangeText={(password) => setPassword(password)} style={styles.textInput} placeholder='password' />
      </View>
      <Pressable style={styles.btn} onPress={() => dispatch(login({email, password}))}>
        <Text style={styles.btnText}>Kayıt Oluştur</Text>
      </Pressable>
    </View>
  )
}

export default LoginPage
