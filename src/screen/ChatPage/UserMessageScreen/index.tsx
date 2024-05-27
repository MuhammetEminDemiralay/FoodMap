import { View, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { styles } from "./styles";


const UserMessageScreen = () => {



    const navigation: any = useNavigation();




    return (
        <View style={styles.container}>
            <Text>User messages</Text>
        </View>
    )
}

export default UserMessageScreen