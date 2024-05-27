import { View, Text, Button, Pressable } from "react-native"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ChatListScreen = () => {



    const navigation: any = useNavigation();





    return (
        <View style={styles.container}>
            <Button title="chat" onPress={() => navigation.navigate("userMessage")} />
            <Pressable style={styles.userListBtn} onPress={() => navigation.navigate('userList')}>
                <FontAwesome name="users" size={24} color="#d4f4dd" />
            </Pressable>
        </View>
    )
}

export default ChatListScreen